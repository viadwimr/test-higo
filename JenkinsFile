pipeline {
  agent {
    // this image provides everything needed to run Cypress
    docker {
      image 'cypress/base:10'
    }
  }

  stages {
    stage('build and test') {
      environment {
        // we will be recording test results and video on Cypress dashboard
        // to record we need to set an environment variable
        // we can load the record key variable from credentials store
        // see https://jenkins.io/doc/book/using/using-credentials/
        CYPRESS_CACHE_FOLDER=node_modules/cypress/cache/Cypress
      }

      steps {
        sh 'npm install'
        sh 'npm run test:e2e'
      }
    }
  }
}