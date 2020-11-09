@Library('jenkins-library' ) _

def pipeline = new org.js.LibPipeline(
    steps: this, test: false,
    dockerImageName: 'soramitsu/substrate-js-library',
    buildDockerImage: 'node:15-alpine')
pipeline.runPipeline()