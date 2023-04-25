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
            if(JOB_NAME == 'EMS_Denso' && hour == 23) {
              filename = "DATA AKUMULASI"
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/admin/data-accumulation.cy.js' --env allure=true"
            } else if(JOB_NAME == 'EMS_Denso' && day == 3 && hour == 2) {
              filename = "Dashboard"
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/admin/dashboard.cy.js' --env allure=true"
            } else if(JOB_NAME == 'EMS_Denso' && day == 3 && hour == 3) {
              filename = "Device"
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/admin/device.cy.js' --env allure=true"
            } else if(JOB_NAME == 'EMS_Denso' && day == 3 && hour == 4) {
              filename = "Forgot Password"
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/admin/forgot-password.cy.js' --env allure=true"
            } else if(JOB_NAME == 'EMS_Denso' && day == 3 && hour == 5) {
              filename = "Forgot Username"
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/admin/forgot-username.cy.js' --env allure=true"
            } else if(JOB_NAME == 'EMS_Denso' && day == 3 && hour == 6) {
              filename = "Login"
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/admin/login.cy.js' --env allure=true"
            } else if(JOB_NAME == 'EMS_Denso' && day == 3 && hour == 7) {
              filename = "Report"
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/admin/report.cy.js' --env allure=true"
            } else if(JOB_NAME == 'EMS_Denso' && day == 3 && hour == 8) {
              filename = "Sign Out"
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/admin/sign-out.cy.js' --env allure=true"
            } else if(JOB_NAME == 'EMS_Denso' && day == 3 && hour == 9) {
              filename = "Target"
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/admin/target.cy.js' --env allure=true"
            } else if(JOB_NAME == 'EMS_Denso' && day == 3 && hour == 10) {
              filename = "User Profile"
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/admin/user-profile.cy.js' --env allure=true"
            } else if(JOB_NAME == 'EMS_Denso' && day == 3 && hour == 11) {
              filename = "User"
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/admin/user.cy.js' --env allure=true"
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
    }
  }
}
