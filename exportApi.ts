import { ApiPromise } from '@polkadot/api';
import { WsProvider } from '@polkadot/rpc-provider';
import { options } from '@sora-substrate/api';
import fs from 'fs';
import { localTypes } from '@sora-substrate/type-definitions'


enum CallType {
  StateQuery = "query", Extrinsic = "tx", Rpc = "rpc", Constant = "const"
}

class CallDoc {
  callType: CallType;
  section: string;
  method: string;
  documentation: Array<string>;
  args: Array<[string, string]>; 
  ret?: string;

  constructor(callType: CallType, section: string, method: string, documentation: Array<string>, args: Array<[string, string]>, ret?: string) {
    this.callType = callType;
    this.section = section;
    this.method = method;
    this.documentation = documentation;
    this.args = args;
    this.ret = ret;
  }

  makeMd() {
    const header = makeHeader(4, `**${this.makeApiCall(this.callType)}**`);
    const documentation = this.documentation.map(a => '\n>'+a).join('');
    return `${header}\n${documentation}${this.makeArgsMd()}${this.makeReturnMd()}\n<hr>`;
  }

  makeArgsMd() {
    if (this.args.length == 0) {
      return "\n\narguments: -";
    } else {
      return "\n\narguments: "+this.args.map(a => '\n+ '+a[0]+": `"+a[1]+"`").join('');
    }
  }

  makeReturnMd() {
    if (this.ret == null) {
      return "";
    } else {
      return "\n\nreturns: `"+this.ret+"`";
    }
  }

  makeApiCall(type: CallType) {
    return `api.${type.toString()}.${this.section}.${this.method}`;
  }
}

function extractQueries(api: ApiPromise): Array<CallDoc> {
  let data = api.query;
  let queries: Array<CallDoc> = Array();

  for(const section in data) {
    for(const method in data[section]) {
      const documentation: Array<string> = data[section][method]['meta'].documentation.map(a => a.toString());
      const type = data[section][method]['meta'].type;
      let args = [];
      let ret = '';
      if (type.isPlain) {
        ret = type.asPlain.toString();
      } else if (type.isMap) {
        let actualType = type.asMap;
        args.push(['key', actualType['key'].toString()]);
        ret = actualType['value'].toString();
      } else if (type.isDoubleMap) {
        let actualType = type.asDoubleMap;
        args.push(['key1', actualType['key1'].toString()]);
        args.push(['key2', actualType['key2'].toString()]);
        ret = actualType['value'].toString();
      } else {
        console.log(`Encountered unsupported storage item: ${section}.${method}`);
      }

      let doc = new CallDoc(CallType.StateQuery, section, method, documentation, args, ret);
      queries.push(doc);
    }
  }

  return queries;
}

function extractTxns(api: ApiPromise): Array<CallDoc> {
    let data = api.tx;
    let txns: Array<CallDoc> = Array();
  
    for(const section in data) {
      for(const method in data[section]) {
        const documentation: Array<string> = data[section][method]['meta'].documentation.map(a => a.toString());
        const args: Array<[string, string]> = data[section][method]['meta'].args.map(a => [a.name.toString(), a.type.toString()]);
        let doc = new CallDoc(CallType.Extrinsic, section, method, documentation, args, null);
        txns.push(doc);
      }
    }

    return txns;
}

function extractRpcs(api: ApiPromise): Array<CallDoc> {
  let data = api.rpc;
    let queries: Array<CallDoc> = Array();
  
    for(const section in data) {
      for(const method in data[section]) {
        const documentation: Array<string> = [data[section][method]['meta'].description];
        const args = data[section][method]['meta'].params.map(a => [a.name.toString(), a.type.toString()]);
        const type = data[section][method]['meta'].type;
        let doc = new CallDoc(CallType.Rpc, section, method, documentation, args, type);
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
  if (callType == 'query') {
    return makeHeader(3, '*State Queries*');
  } else if (callType == 'tx') {
    return makeHeader(3, '*Extrinsics*');
  } else if (callType == 'rpc') {
    return makeHeader(3, '*Custom RPCs*');
  } else if (callType == 'const') {
    return makeHeader(3, '*Constants*');
  } else {
    return makeHeader(3, '<unknown call type>');
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
  const provider = new WsProvider('ws://localhost:9944/');
  const api = new ApiPromise(options({ provider }));
  await api.isReady;

  let apiDoc = "";
  let combinedDocs = Array();
  combinedDocs.push(...extractQueries(api), ...extractTxns(api), ...extractRpcs(api));

  let toc = "**Table of Contents (Pallets)**\n\n";

  // Collecting api calls and constructing toc
  let grouped = groupBy(combinedDocs, elem => elem['section']);
  for(let section in grouped) {
    let subgroup = groupBy(grouped[section], elem => elem['callType']);
    
    apiDoc += makeSectionTitle(section);
    toc += makeLinkToSection(section) + '\n';

    for(let callType in subgroup) {
      apiDoc += makeCallTypeTitle(callType);
      for(let i = 0; i < subgroup[callType].length; i++) {
        apiDoc += subgroup[callType][i].makeMd();
      }
    }
  }

  // Collecting type definitions
  const orderedLocalTypes = Object.keys(localTypes).sort().reduce(
    (obj, key) => { 
      obj[key] = localTypes[key]; 
      return obj;
    }, 
    {}
  );
  let types = "";
  for(let type in orderedLocalTypes) {
    types += makeHeader(3, type);
    types += "```\n" + JSON.stringify(localTypes[type], null, 4).replace(/"([^"]+)":/g, '$1:') + "\n```";
  }

  let document = makeHeader(1, "API Calls") + toc + apiDoc + makeHeader(1, 'Types') + types;

  fs.writeFileSync("doc.md", document);
}

main().catch(console.error).finally(() => process.exit());