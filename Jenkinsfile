def discordStatus = ""
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
            when {
              expression { cron '25 4 * * 5' } // jalankan setiap jumat pada tengah hari WIB
            }
            if(JOB_NAME == 'EMS_Admin_Alert') {
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/admin/alert.cy.js' --env allure=true"
            }
            if(JOB_NAME == 'EMS_Denso') {
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/admin/dashboard.cy.js' --env allure=true"
            }
            if(JOB_NAME == 'EMS_Admin_Device') {
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/admin/device.cy.js' --env allure=true"
            }
            if(JOB_NAME == 'EMS_Admin_Indicator') {
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/admin/indicator.cy.js' --env allure=true"
            }
            if(JOB_NAME == 'EMS_Admin_Login') {
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/admin/login.cy.js' --env allure=true"
            }
            if(JOB_NAME == 'EMS_Admin_Report') {
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/admin/report.cy.js' --env allure=true"
            }
            if(JOB_NAME == 'EMS_Admin_Threshold') {
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/admin/threshold.cy.js' --env allure=true"
            }
            if(JOB_NAME == 'EMS_Admin_UserProfile') {
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/admin/user-profile.cy.js' --env allure=true"
            }
            if(JOB_NAME == 'EMS_Admin_User') {
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/admin/user.cy.js' --env allure=true"
            }
            if(JOB_NAME == 'EMS_Operator_Dashboard') {
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/operator/dashboard.cy.js' --env allure=true"
            }
            if(JOB_NAME == 'EMS_Operator_Device') {
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/operator/device.cy.js' --env allure=true"
            }
            if(JOB_NAME == 'EMS_Operator_Login') {
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/operator/login.cy.js' --env allure=true"
            }
            if(JOB_NAME == 'EMS_Operator_Report') {
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/operator/report.cy.js' --env allure=true"
            }
            if(JOB_NAME == 'EMS_Operator_UserProfile') {
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/operator/shift.cy.js' --env allure=true"
            }
          } catch(Exception e) {
            currentBuild.result = 'FAILURE'
          }
        }
      }
      post {
        always {
          script {
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
  post {
    success {
      allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
      discordSend customAvatarUrl: "https://cdn-icons-png.flaticon.com/512/573/573131.png?w=740&t=st=1662092610~exp=1662093210~hmac=371422cdcab8bcef11a630644d30876eabb73ac7c0dd627d7ed6360054ae3259", 
      customUsername: "Tests Reporter", 
      title: "${JOB_NAME} ${BUILD_DISPLAY_NAME}", 
      link: "${env.BUILD_URL}/allure", 
      description: "Running on jenkins ${NODE_LABELS}", 
      result: currentBuild.currentResult, 
      footer: "EVOMO", 
      showChangeset: true, 
      thumbnail: discordStatus, 
      webhookURL: "https://discord.com/api/webhooks/1069835490976608307/uz9TsKgGLFHeZgkup4gy2DjgI9I3wgEpiuQcs31hIkKdoScRYlaqDTqQVxX311LvrUlZ"
    }
    failure {
      allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
      discordSend customAvatarUrl: "https://cdn-icons-png.flaticon.com/512/573/573131.png?w=740&t=st=1662092610~exp=1662093210~hmac=371422cdcab8bcef11a630644d30876eabb73ac7c0dd627d7ed6360054ae3259", 
      customUsername: "Tests Reporter", 
      title: "${JOB_NAME} ${BUILD_DISPLAY_NAME}", 
      link: "${env.BUILD_URL}/allure", 
      description: "Running on jenkins ${NODE_LABELS}", 
      result: currentBuild.currentResult, 
      footer: "EVOMO", 
      showChangeset: true, 
      thumbnail: discordStatus, 
      webhookURL: "https://discord.com/api/webhooks/1069835490976608307/uz9TsKgGLFHeZgkup4gy2DjgI9I3wgEpiuQcs31hIkKdoScRYlaqDTqQVxX311LvrUlZ"
    }
  }
}
