interface Config {
  url: string;
  sudoSeed: string;
  dexSeed: string;
  userSeed: string;
  liquiditySeed: string;
}

export let config: Config

if(process.env.ENV === 'DEV') {
  config = {
    url: "wss://ws.framenode-1.s1.dev.sora2.soramitsu.co.jp/",
    sudoSeed: "era actor pluck voice frost club gallery palm moment empower whale flame",
    dexSeed: "scissors spread water arrive damp face amazing shrug warfare silk dry prison",
    userSeed: "vapor ice pig awful muscle know path senior degree impose volume ticket",
    liquiditySeed: "sea globe sibling unit core modify repair surprise scatter minute decline trial"
  }
  console.log('Running in DEV')
} else if(process.env.ENV === 'TEST') {
  config = {
    url: "wss://ws.framenode-1.s1.tst.sora2.soramitsu.co.jp/",
    sudoSeed: "surprise survey disagree calm cinnamon off clever door very exercise glove connect",
    dexSeed: "scissors spread water arrive damp face amazing shrug warfare silk dry prison",
    userSeed: "vapor ice pig awful muscle know path senior degree impose volume ticket",
    liquiditySeed: "sea globe sibling unit core modify repair surprise scatter minute decline trial"
  }
  console.log('Running in TEST')
} else if(process.env.ENV === 'STAGE') {
  config = {
    url: "wss://ws.stage.sora2.soramitsu.co.jp/",
    sudoSeed: "surprise survey disagree calm cinnamon off clever door very exercise glove connect",
    dexSeed: "scissors spread water arrive damp face amazing shrug warfare silk dry prison",
    userSeed: "vapor ice pig awful muscle know path senior degree impose volume ticket",
    liquiditySeed: "sea globe sibling unit core modify repair surprise scatter minute decline trial"
  }
  console.log('Running in STAGE')
}
