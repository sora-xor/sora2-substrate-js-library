import fs from 'fs';
import { ApiPromise } from '@polkadot/api';
import { WsProvider } from '@polkadot/rpc-provider';
import { unwrapStorageType } from '@polkadot/types';
import { options } from '@sora-substrate/api';
import { localTypes } from '@sora-substrate/type-definitions';
import type { ILookup } from '@polkadot/types-create/types';
import type { SiLookupTypeId } from '@polkadot/types/interfaces';

import { SORA_ENV } from './consts';

const META_STR = 'meta';
const KEY_STR = 'key';
const KEY1_STR = 'key1';
const KEY2_STR = 'key2';

enum CallType {
  StateQuery = 'query',
  Extrinsic = 'tx',
  Rpc = 'rpc',
  Constant = 'const',
}

class CallDoc {
  constructor(
    public callType: CallType,
    public section: string,
    public method: string,
    public docs: Array<string>,
    public args: Array<[string, string]>,
    public ret?: string
  ) {}

  makeMd() {
    const header = makeHeader(4, `**${this.makeApiCall(this.callType)}**`);
    const docs = this.docs.map((a) => '\n>' + a).join('');
    return `${header}\n${docs}${this.makeArgsMd()}${this.makeReturnMd()}\n<hr>`;
  }

  makeArgsMd() {
    if (this.args.length == 0) {
      return '\n\narguments: -';
    } else {
      return '\n\narguments: ' + this.args.map((a) => '\n+ ' + a[0] + ': `' + a[1] + '`').join('');
    }
  }

  makeReturnMd() {
    if (this.ret == null) {
      return '';
    } else {
      return '\n\nreturns: `' + this.ret + '`';
    }
  }

  makeApiCall(type: CallType) {
    return `api.${type.toString()}.${this.section}.${this.method}`;
  }
}

function getSiName(lookup: ILookup, type: SiLookupTypeId): string {
  const typeDef = lookup.getTypeDef(type);
  return typeDef.lookupName || typeDef.type;
}

function extractQueries(api: ApiPromise): Array<CallDoc> {
  let data = api.query;
  let queries: Array<CallDoc> = Array();

  for (const section in data) {
    for (const method in data[section]) {
      const docs: Array<string> = data[section][method][META_STR].docs.map((a) => a.toString());
      const type = data[section][method][META_STR].type;
      const lookup = type.registry.lookup;
      let args: Array<any> = [];
      if (type.isMap) {
        const formattedActualTypeKey = getSiName(lookup, type.asMap[KEY_STR].toJSON());
        args.push([KEY_STR, formattedActualTypeKey]);
      } else if (type.isDoubleMap) {
        const actualType = type.asDoubleMap;
        const formattedActualTypeKey1 = getSiName(lookup, actualType[KEY1_STR].toJSON());
        const formattedActualTypeKey2 = getSiName(lookup, actualType[KEY2_STR].toJSON());
        args.push([KEY1_STR, formattedActualTypeKey1]);
        args.push([KEY2_STR, formattedActualTypeKey2]);
      } else if (!type.isPlain) {
        console.log(`Encountered unsupported storage item: ${section}.${method}`);
      }

      const ret = unwrapStorageType(type.registry, type);

      let doc = new CallDoc(CallType.StateQuery, section, method, docs, args, ret);
      queries.push(doc);
    }
  }

  return queries;
}

function extractTxns(api: ApiPromise): Array<CallDoc> {
  let data = api.tx;
  let txns: Array<CallDoc> = Array();

  for (const section in data) {
    for (const method in data[section]) {
      const docs: Array<string> = data[section][method][META_STR].docs.map((a) => a.toString());
      const args: Array<[string, string]> = data[section][method][META_STR].args.map((a) => [
        a.name.toString(),
        a.type.toString(),
      ]);
      let doc = new CallDoc(CallType.Extrinsic, section, method, docs, args, undefined);
      txns.push(doc);
    }
  }

  return txns;
}

function extractRpcs(api: ApiPromise): Array<CallDoc> {
  let data = api.rpc;
  let queries: Array<CallDoc> = Array();

  for (const section in data) {
    for (const method in data[section]) {
      const docs: Array<string> = [data[section][method][META_STR].description];
      const args = data[section][method][META_STR].params.map((a) => [a.name.toString(), a.type.toString()]);
      const type = data[section][method][META_STR].type;
      let doc = new CallDoc(CallType.Rpc, section, method, docs, args, type);
      queries.push(doc);
    }
  }

  return queries;
}

function makeHeader(degree: number, text: string) {
  return `\n\n${'#'.repeat(degree)} ${text}\n`;
}

function makeLinkToSection(section: string) {
  return `* [${section}](#${section.toLowerCase().trim()}-pallet)`;
}

function makeSectionTitle(section: string) {
  return makeHeader(2, capitalizeFirstLetter(section) + ' pallet');
}

function makeCallTypeTitle(callType: string) {
  const headerNum = 3;
  if (callType == 'query') {
    return makeHeader(headerNum, '*State Queries*');
  } else if (callType == 'tx') {
    return makeHeader(headerNum, '*Extrinsics*');
  } else if (callType == 'rpc') {
    return makeHeader(headerNum, '*Custom RPCs*');
  } else if (callType == 'const') {
    return makeHeader(headerNum, '*Constants*');
  } else {
    return makeHeader(headerNum, '<unknown call type>');
  }
}

function groupBy<T, K extends keyof any>(list: T[], getKey: (item: T) => K) {
  return list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!previous[group]) previous[group] = [];
    previous[group].push(currentItem);
    return previous;
  }, {} as Record<K, T[]>);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function main(): Promise<void> {
  const provider = new WsProvider(SORA_ENV.dev);
  const api = new ApiPromise(options({ provider }));
  await api.isReady;

  let apiDoc = '';
  let combinedDocs = Array();
  combinedDocs.push(...extractQueries(api), ...extractTxns(api), ...extractRpcs(api));

  let toc = '**Table of Contents (Pallets)**\n\n';

  // Collecting api calls and constructing toc
  let grouped = groupBy(combinedDocs, (elem) => elem['section']);
  for (let section in grouped) {
    let subgroup = groupBy(grouped[section], (elem) => elem['callType']);

    apiDoc += makeSectionTitle(section);
    toc += makeLinkToSection(section) + '\n';

    for (let callType in subgroup) {
      apiDoc += makeCallTypeTitle(callType);
      for (let i = 0; i < subgroup[callType].length; i++) {
        apiDoc += subgroup[callType][i].makeMd();
      }
    }
  }

  // Collecting type definitions
  const orderedLocalTypes = Object.keys(localTypes)
    .sort()
    .reduce((obj, key) => {
      obj[key] = localTypes[key];
      return obj;
    }, {});
  let types = '';
  for (let type in orderedLocalTypes) {
    types += makeHeader(3, type);
    types += '```\n' + JSON.stringify(localTypes[type], null, 4).replace(/"([^"]+)":/g, '$1:') + '\n```';
  }

  let document = makeHeader(1, 'API Calls') + toc + apiDoc + makeHeader(1, 'Types') + types;

  fs.writeFileSync('doc.md', document);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
