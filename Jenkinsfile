@Library('jenkins-library' ) _

def pipeline = new org.js.LibPipeline(
    steps: this, test: false,
    dockerImageName: 'soramitsu/substrate-js-library',
    buildDockerImage: 'build-tools/node:10-ubuntu',
    buildCmds: ['yarn', 'NODE_ENV=production yarn build'],
    pushCmds: ['yarn publish-workspaces'])
pipeline.runPipeline()