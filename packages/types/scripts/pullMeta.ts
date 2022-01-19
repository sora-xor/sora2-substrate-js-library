import fs from 'fs';
import { w3cwebsocket as WebSocket } from 'websocket';
import { SORA_ENV } from './consts';

async function pullMetadata(apiEndpoint: string, targetFile: string) {
  await new Promise<void>(async (res) => {
    console.log(`Pulling from ${apiEndpoint}`);
    const ws = new WebSocket(apiEndpoint);
    ws.onerror = (error) => {
      console.log(`[${apiEndpoint}] META cannot be pulled!`);
      ws.close();
      res();
    };
    console.log(apiEndpoint);
    await new Promise<void>((resolve) => {
      ws.onopen = (): void => {
        ws.send('{"id":"1","jsonrpc":"2.0","method":"state_getMetadata","params":[]}');
        resolve();
      };
    });
    await new Promise<void>((resolve) => {
      ws.onmessage = (msg: any): void => {
        const metadata = JSON.parse(msg.data).result;
        fs.writeFileSync(targetFile, `export default '${metadata}'`);
        console.log(`${apiEndpoint}: Done!`);
        resolve();
      };
    });
    ws.close();
    res();
  });
}

const promises = [] as Array<Promise<void>>;
if (process.argv[2] === 'all') {
  Object.entries(SORA_ENV).forEach(([name, endpoint]) => {
    promises.push(pullMetadata(endpoint, `packages/types/src/metadata/${name}/latest.ts`));
  });
} else {
  promises.push(pullMetadata(SORA_ENV.dev, 'packages/types/src/metadata/latest.ts'));
}
Promise.all(promises).then(() => process.exit(0));
