pipeline {
  agent any
  tools {
    nodejs '18.5.0'
  }
  stages {
    stage('Shift Pagi') {
      parallel {
        stage('Operator Produksi 1') {
          stages {
            stage('Building') {
              steps {
                sh 'npm ci'
                sh 'npm run cy:verify'
              }
            }
            stage('Testing') {
              steps {
                sh "npx cypress run --browser chrome --spec 'cypress/e2e/operator/opr_prd1.cy.js'"
              }
            }
          }
        }
        stage('Operator Produksi 4') {
          stages {
            stage('Building') {
              steps {
                sh 'npm ci'
                sh 'npm run cy:verify'
              }
            }
            stage('Testing') {
              steps {
                sh "npx cypress run --browser chrome --spec 'cypress/e2e/operator/opr_prd4.cy.js'"
              }
            }
          }
        }
        stage('Operator Produksi 7') {
          stages {
            stage('Building') {
              steps {
                sh 'npm ci'
                sh 'npm run cy:verify'
              }
            }
            stage('Testing') {
              steps {
                sh "npx cypress run --browser chrome --spec 'cypress/e2e/operator/opr_prd7.cy.js'"
              }
            }
          }
        }
      }
    }
  }
  post {
    always {
      cleanWs(cleanWhenNotBuilt: false,
                    deleteDirs: true,
                    disableDeferredWipeout: true,
                    notFailBuild: true,
                    patterns: [[pattern: '/cypress/reports', type: 'EXCLUDE'],
                              [pattern: '/cypress/screenshots', type: 'EXCLUDE'],
                              [pattern: '/node_modules', type: 'EXCLUDE']])
    }
  }
}