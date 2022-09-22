def discordStatus = ""
pipeline {
  agent any
  tools {
    nodejs '18.5.0'
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
            if(JOB_NAME == 'OEE_Engineering_AllSchedule') {
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/engineering/all-schedule.cy.js' --env allure=true"
            }
            if(JOB_NAME == 'OEE_Engineering_Dashboard') {
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/engineering/dashboard.cy.js' --env allure=true"
            }
            if(JOB_NAME == 'OEE_Engineering_Downtime') {
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/engineering/downtime.cy.js' --env allure=true"
            }
            if(JOB_NAME == 'OEE_Engineering_Heatmap') {
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/engineering/heatmap.cy.js' --env allure=true"
            }
            if(JOB_NAME == 'OEE_Engineering_Issues') {
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/engineering/issues.cy.js' --env allure=true"
            }
            if(JOB_NAME == 'OEE_Engineering_Losses') {
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/engineering/losses.cy.js' --env allure=true"
            }
            if(JOB_NAME == 'OEE_Engineering_Machine') {
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/engineering/machine.cy.js' --env allure=true"
            }
            if(JOB_NAME == 'OEE_Engineering_Parameter') {
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/engineering/parameter.cy.js' --env allure=true"
            }
            if(JOB_NAME == 'OEE_Engineering_Pareto') {
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/engineering/pareto.cy.js' --env allure=true"
            }
            if(JOB_NAME == 'OEE_Engineering_Product') {
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/engineering/product.cy.js' --env allure=true"
            }
            if(JOB_NAME == 'OEE_Engineering_Reason') {
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/engineering/reason.cy.js' --env allure=true"
            }
            if(JOB_NAME == 'OEE_Engineering_Report') {
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/engineering/report.cy.js' --env allure=true"
            }
            if(JOB_NAME == 'OEE_Engineering_Runtime') {
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/engineering/runtime.cy.js' --env allure=true"
            }
            if(JOB_NAME == 'OEE_Engineering_Shift') {
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/engineering/shift.cy.js' --env allure=true"
            }
            if(JOB_NAME == 'OEE_Engineering_Threshold') {
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/engineering/threshold.cy.js' --env allure=true"
            }
            if(JOB_NAME == 'OEE_Engineering_Trend') {
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/engineering/trend.cy.js' --env allure=true"
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
      customUsername: "E2E Tests Reporter", 
      title: "${JOB_NAME} ${BUILD_DISPLAY_NAME}", 
      link: "${env.BUILD_URL}/allure", 
      description: "Running on jenkins ${NODE_LABELS}", 
      result: currentBuild.currentResult, 
      footer: "EVOMO", 
      showChangeset: true, 
      thumbnail: discordStatus, 
      webhookURL: "https://discord.com/api/webhooks/1019072999074312292/Y954H9_7sX3IaRXt8wUpr0geMZZnlFvyqz8etdNF7zjNW2Lo1yvtn8gSKi0COSPEFJOB"
      deleteDir()
    }
    failure {
      allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
      discordSend customAvatarUrl: "https://cdn-icons-png.flaticon.com/512/573/573131.png?w=740&t=st=1662092610~exp=1662093210~hmac=371422cdcab8bcef11a630644d30876eabb73ac7c0dd627d7ed6360054ae3259", 
      customUsername: "E2E Tests Reporter", 
      title: "${JOB_NAME} ${BUILD_DISPLAY_NAME}", 
      link: "${env.BUILD_URL}/allure", 
      description: "Running on jenkins ${NODE_LABELS}", 
      result: currentBuild.currentResult, 
      footer: "EVOMO", 
      showChangeset: true, 
      thumbnail: discordStatus, 
      webhookURL: "https://discord.com/api/webhooks/1019072999074312292/Y954H9_7sX3IaRXt8wUpr0geMZZnlFvyqz8etdNF7zjNW2Lo1yvtn8gSKi0COSPEFJOB"
      deleteDir()
    }
  }
}