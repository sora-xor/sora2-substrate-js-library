@Library('jenkins-library') _

def pipeline = new org.js.LibPipeline(
    steps: this,
    testCmds: ['yarn test:all'],
    dockerImageName: 'soramitsu/substrate-js-library',
    buildDockerImage: 'build-tools/node:10-ubuntu',
    buildCmds: ['yarn', 'NODE_ENV=production yarn build'],
    pushCmds: ['yarn publish-workspaces'],
    npmRegistries: ['': 'npm-soramitsu-admin'],
    npmLoginEmail:'admin@soramitsu.co.jp')
pipeline.runPipeline()
