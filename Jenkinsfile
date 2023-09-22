@Library('jenkins-library@feature/dops-2752') _

def pipeline = new org.js.LibPipeline(
    steps: this,
    test: false,
    dockerImageName: 'soramitsu/substrate-js-library',
    buildDockerImage: 'build-tools/node:14-ubuntu',
    preBuildCmds: ['yarn'],
    buildCmds: ['yarn build', 'yarn export-types:all'],
    sonarProjectName: 'sora2-substrate-js-library',
    sonarProjectKey: 'sora2:sora2-substrate-js-library',
    npmLoginEmail:'admin@soramitsu.co.jp',
    sonarSrcPath: 'packages,scripts',
    sonarTestsPath: 'tests',
    dojoProductType: 'sora',
    prStatusNotif: true
)
pipeline.runPipeline()