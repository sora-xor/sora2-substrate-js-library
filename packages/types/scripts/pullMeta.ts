import fs from 'fs'
import { w3cwebsocket as WebSocket } from 'websocket'

function pullMetadata(api_endpoint: string, target_file: string) {
  console.log(`Pulling from ${api_endpoint}`);
  const ws = new WebSocket(api_endpoint);
  ws.onopen = (): void => {
    ws.send('{"id":"1","jsonrpc":"2.0","method":"state_getMetadata","params":[]}')
  }
  ws.onmessage = (msg: any): void => {
    const metadata = JSON.parse(msg.data).result
    fs.writeFileSync(target_file, `export default '${metadata}'`)
    console.log('Done')
    process.exit(0)
  }
}
pullMetadata('ws://localhost:9944', 'packages/types/src/metadata/latest.ts')
