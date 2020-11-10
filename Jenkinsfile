@Library('jenkins-library' ) _

def pipeline = new org.js.LibPipeline(
    steps: this, test: false,
    dockerImageName: 'soramitsu/substrate-js-library',
    buildDockerImage: 'build-tools/node:14-ubuntu',
    buildCmds: ['yarn', 'NODE_ENV=production yarn build'])
pipeline.runPipeline()