pipeline {
  agent {
    // this image provides everything needed to run Cypress
    docker {
      image 'cypress/included:10.3.0'
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