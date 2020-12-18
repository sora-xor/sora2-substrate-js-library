import fs from 'fs'
import { localTypes } from '@sora-substrate/type-definitions'

function sortObjectByKey(value) {
    return Object.keys(value).sort().reduce(
        (o, key) => {
            const v = value[key];
            o[key] = v;
            return o;
        }, {})
}

function generateTypesJson() {
    console.log("NOTE: Make sure `yarn build` was run with latest types");
    fs.writeFileSync('packages/types/src/metadata/types.json', JSON.stringify(sortObjectByKey(localTypes), null, 4))
}

generateTypesJson()
