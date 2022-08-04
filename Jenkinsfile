@Library('jenkins-library@feature/DOPS-1857') _

def pipeline = new org.js.LibPipeline(
    steps: this,
    test: false,
    dockerImageName: 'soramitsu/substrate-js-library',
    buildDockerImage: 'build-tools/node:14-ubuntu',
    buildCmds: ['yarn', 'NODE_ENV=production yarn build'],
    pushCmds: ['yarn publish-workspaces --no-verify-access'],
    sonarProjectName: 'sora2-substrate-js-library',
    sonarProjectKey: 'jp.co.soramitsu:sora2-substrate-js-library',
    npmLoginEmail:'admin@soramitsu.co.jp')
pipeline.runPipeline()
