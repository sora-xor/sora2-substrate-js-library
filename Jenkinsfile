@Library('jenkins-library') _

def pipeline = new org.js.LibPipeline(
    steps: this,
    test: false,
    dockerImageName: 'soramitsu/substrate-js-library',
    buildDockerImage: 'build-tools/node:20-alpine',
    buildCmds: ['yarn', 'NODE_ENV=production yarn build'],
    pushCmds: ['yarn publish-workspaces --no-verify-access'],
    sonarProjectName: 'sora2-substrate-js-library',
    sonarProjectKey: 'sora2:sora2-substrate-js-library',
    npmLoginEmail:'admin@soramitsu.co.jp',
    sonarSrcPath: 'packages,scripts',
    sonarTestsPath: 'tests',
    dojoProductType: 'polkaswap'
    )
pipeline.runPipeline()
