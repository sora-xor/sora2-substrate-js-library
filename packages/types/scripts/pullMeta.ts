import fs from 'fs'
import { w3cwebsocket as WebSocket } from 'websocket'

export enum SORA_ENV {
  stage = 'wss://ws.stage.sora2.soramitsu.co.jp',
  prod = 'wss://ws.sora2.soramitsu.co.jp',
  test = 'wss://ws.framenode-1.s1.tst.sora2.soramitsu.co.jp',
  dev = 'wss://ws.framenode-1.s1.dev.sora2.soramitsu.co.jp',
}

async function pullMetadata(apiEndpoint: string, targetFile: string) {
  console.log(`Pulling from ${apiEndpoint}`)
  const ws = new WebSocket(apiEndpoint)

  await new Promise<void>(resolve => {
    ws.onopen = (): void => {
      ws.send('{"id":"1","jsonrpc":"2.0","method":"state_getMetadata","params":[]}')
      resolve()
    }
  })
  await new Promise<void>(resolve => {
    ws.onmessage = (msg: any): void => {
      const metadata = JSON.parse(msg.data).result
      fs.writeFileSync(targetFile, `export default '${metadata}'`)
      console.log(`${apiEndpoint}: Done!`)
      resolve()
    }
  })
  ws.close()
}

const promises = [] as Array<Promise<void>>
if (process.argv[2] === 'all') {
  Object.entries(SORA_ENV).forEach(([name, endpoint]) => {
    promises.push(pullMetadata(endpoint, `packages/types/src/metadata/${name}/latest.ts`))
  })
} else {
  promises.push(pullMetadata('ws://localhost:9944', 'packages/types/src/metadata/latest.ts'))
}
Promise.all(promises).then(() => process.exit(0))
