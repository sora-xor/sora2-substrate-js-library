@Library('jenkins-library@feature/js-prebuild-steps') _

def pipeline = new org.js.LibPipeline(
    steps: this,
    preBuildCmds: ['yarn --update-checksums', 'yarn install'],
    dockerImageName: 'soramitsu/substrate-js-library',
    buildDockerImage: 'build-tools/node:14-alpine',
    buildCmds: ['yarn', 'NODE_ENV=production yarn build'],
    pushCmds: ['yarn publish-workspaces'],
    npmRegistries: ['': 'npm-soramitsu-admin'],
    npmLoginEmail:'admin@soramitsu.co.jp'),
    test: false
pipeline.runPipeline()
