import fs from 'fs'
import { localTypes } from '@sora-substrate/type-definitions'

function sortObjectByKey(value) {
  return Object.keys(value).sort().reduce((o, key) => {
    const v = value[key]
    o[key] = v
    return o
  }, {})
}

export function generateTypesJson(env?: string) {
  console.log("NOTE: Make sure `yarn build` was run with latest types")
  let sortedTypes = sortObjectByKey(localTypes);
  const data = JSON.stringify(sortedTypes, null, 4);
  const typesScalecodec = JSON.stringify(convertTypes(sortedTypes, true), null, 4);
  fs.writeFileSync(`packages/types/src/metadata${env ? '/' + env : ''}/types.json`, data);
  fs.writeFileSync(`packages/types/src/metadata${env ? '/' + env : ''}/types_scalecodec.json`, typesScalecodec);

}

generateTypesJson(process.argv[2])

function convertTypes(inputContent: object, addCustom: boolean) {
  const types = {};
  types["runtime_id"] = 1;
  types["versioning"] = [];
  types["versioning"].push(
    {
      runtime_range: [1, null],
      types: buildTop(inputContent, addCustom)
    },
  )
  return types;
}

function buildTop(inputContent: object, addCustom: boolean) {
  let builder = {};
  if (addCustom) {
    builder = {
      String: "Text",
      FixedU128: "u128",
      U256: "u256",
      SessionKeys2: "(AccountId, AccountId)"
    };
  }

  buildTypes(builder, inputContent);
  return builder;
}

function buildTypes(builder: any, tree: object) {
  for (let [key, value] of Object.entries(tree)) {
    if (typeof value != 'object') {
      builder[key] = value;
    } else {
      if (value["_enum"]) {
        let el = value["_enum"]
        if (Array.isArray(el)) {
          builder[key] = buildEnumItem(el);
        } else {
          builder[key] = buildEnumMapItem(el);
        }
      } else {
        builder[key] = buildStruct(value);
      }
    }
  }
}

function buildEnumItem(a: object) {
  const builder = {};
  builder["type"] = "enum";
  builder["values_list"] = [];
  for (let [, value] of Object.entries(a)) {
    builder["values_list"].push(value);
  }
  return builder;
}

function buildStruct(tree: object) {
  const builder = {};
  builder["type"] = "struct";
  builder["type_mapping"] = [];
  for (let [key, value] of Object.entries(tree)) {
    builder["type_mapping"].push(buildArrayItem(key, value));
  }
  return builder;
}

function buildArrayItem(key: string, value: any) {
  return [key, value];
}

function buildEnumMapItem(o: object) {
  const builder = {};
  builder["type"] =  "enum";
  builder["type_mapping"] = [];
  for (let [key, value] of Object.entries(o)) {
    builder["type_mapping"].push(buildArrayItem(key, value));
  }
  return builder;
}
