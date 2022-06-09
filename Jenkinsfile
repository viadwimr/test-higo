pipeline {
  agent {
    // this image provides everything needed to run Cypress
    docker {
      image 'cypress/base:10'
    }
  }

  stages {
    stage('build and test') {
      steps {
        sh 'cypress install'
        sh './node_modules/.bin/cypress run'
      }
    }
  }
}