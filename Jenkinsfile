def discordStatus = ""
def filename = ""
pipeline {
  agent { label 'qa-node' }
  tools {
    nodejs 'nodejs'
  }
  stages {
    stage('Building') {
      steps {
        sh 'npm ci'
        sh 'npm run cy:verify'
      }
    }
    stage('Testing') {
      steps {
        script {
          try {
            def now = new Date()
            def hour = now.getHours()
            def day = now.getDay()
            println hour
            if(JOB_NAME == 'EMS_IBR' && day == 0 && hour == 2) {
              filename = "Device (Reviewer)"
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/reviewer/device.cy.js' --env allure=true"
            } else if(JOB_NAME == 'EMS_IBR' && day == 0 && hour == 14) {
              filename = "Dashboard (Reviewer)"
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/reviewer/dashboard.cy.js' --env allure=true"
            } else if(JOB_NAME == 'EMS_IBR' && day == 1 && hour == 2) {
              filename = "Alert (Reviewer)"
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/reviewer/alert.cy.js' --env allure=true"
            } else if(JOB_NAME == 'EMS_IBR' && day == 1 && hour == 14) {
              filename = "Forgot Password (Reviewer)"
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/reviewer/forgot-password.cy.js' --env allure=true"
            } else if(JOB_NAME == 'EMS_IBR' && day == 2 && hour == 2) {
              filename = "Forgot Username (Reviewer)"
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/reviewer/forgot-username.cy.js' --env allure=true"
            } else if(JOB_NAME == 'EMS_IBR' && day == 2 && hour == 14) {
              filename = "Login (Reviewer)"
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/reviewer/login.cy.js' --env allure=true"
            } else if(JOB_NAME == 'EMS_IBR' && day == 3 && hour == 2) {
              filename = "Report (Reviewer)"
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/reviewer/report.cy.js' --env allure=true"
            } else if(JOB_NAME == 'EMS_IBR' && day == 3 && hour == 14) {
              filename = "Sign Out (Reviewer)"
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/reviewer/sign-out.cy.js' --env allure=true"
            } else if(JOB_NAME == 'EMS_IBR' && day == 4 && hour == 2) {
              filename = "Threshold (Reviewer)"
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/reviewer/threshold.cy.js' --env allure=true"
            } else if(JOB_NAME == 'EMS_IBR' && day == 4 && hour == 14) {
              filename = "User Profile (Reviewer)"
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/reviewer/user-profile.cy.js' --env allure=true"
            } else if(JOB_NAME == 'EMS_IBR' && day == 5 && hour == 2) {
              filename = "User (Reviewer)"
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/reviewer/user.cy.js' --env allure=true"
            } else if(JOB_NAME == 'EMS_IBR' && day == 5 && hour == 14) {
              filename = "Indicator (Reviewer)"
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/reviewer/indicator.cy.js' --env allure=true"
            } else if(JOB_NAME == 'EMS_IBR' && day == 6 && hour == 2) {
              filename = "Trend (Reviewer)"
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/reviewer/trend.cy.js' --env allure=true"
            }
          } catch(Exception e) {
            currentBuild.result = 'FAILURE'
          }
        }
      }
      post {
        always {
          script {
            if(filename=="") {
              currentBuild.result = 'ABORTED'
            } else {
              if(currentBuild.result == 'FAILURE') {
                discordStatus = 'https://storage.googleapis.com/success_bug_icon/failed.png'
              } else if (currentBuild.currentResult == 'SUCCESS'){
                discordStatus = 'https://storage.googleapis.com/success_bug_icon/passed.png'
              }
            }
          }
        }
      }
    }
  }
  post {
    success {
      allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
      discordSend customAvatarUrl: "https://cdn-icons-png.flaticon.com/512/573/573131.png?w=740&t=st=1662092610~exp=1662093210~hmac=371422cdcab8bcef11a630644d30876eabb73ac7c0dd627d7ed6360054ae3259", 
      customUsername: "Tests Reporter", 
      title: "${JOB_NAME} ${BUILD_DISPLAY_NAME}", 
      link: "${env.BUILD_URL}/allure", 
      description: "Running on jenkins ${NODE_LABELS}", 
      result: currentBuild.currentResult, 
      footer: "${filename}",  
      showChangeset: true, 
      thumbnail: discordStatus, 
      webhookURL: "https://discord.com/api/webhooks/1019072999074312292/Y954H9_7sX3IaRXt8wUpr0geMZZnlFvyqz8etdNF7zjNW2Lo1yvtn8gSKi0COSPEFJOB"
      deleteDir()
    }
    failure {
      allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
      discordSend customAvatarUrl: "https://cdn-icons-png.flaticon.com/512/573/573131.png?w=740&t=st=1662092610~exp=1662093210~hmac=371422cdcab8bcef11a630644d30876eabb73ac7c0dd627d7ed6360054ae3259", 
      customUsername: "Tests Reporter", 
      title: "${JOB_NAME} ${BUILD_DISPLAY_NAME}", 
      link: "${env.BUILD_URL}/allure", 
      description: "Running on jenkins ${NODE_LABELS}", 
      result: currentBuild.currentResult, 
      footer: "${filename}",  
      showChangeset: true, 
      thumbnail: discordStatus, 
      webhookURL: "https://discord.com/api/webhooks/1019072999074312292/Y954H9_7sX3IaRXt8wUpr0geMZZnlFvyqz8etdNF7zjNW2Lo1yvtn8gSKi0COSPEFJOB"
      deleteDir()
    }
  }
}
