pipeline {
  agent {
    // this image provides everything needed to run Cypress
    docker {
      image 'cypress/base:10'
    }
  }

  stages {
    stage('build') {
      steps {
        sh 'npm ci'
        sh 'npm run cy:verify'
      }
    }

    stage('test') {
      steps {
        sh 'npm run test:e2e'
      }
    }
  }
}