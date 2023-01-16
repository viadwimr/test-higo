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
            if(JOB_NAME == 'hmi_prochiz') {
              sh "npx cypress run --browser chrome --spec 'cypress/e2e/operator/routine-check.cy.js' --env allure=true"
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
      webhookURL: "https://discord.com/api/webhooks/1063045911778971678/oG7QZGG0hG9yHmC02UqyUYnk6v-F8SiG9vVJhEB5Z0wj6rNJzW0zTDU5iAdg1XQj_EDc"
      deleteDir()
    }
    failure {
      ws(${WORKSPACE}){ 
        allure([
          includeProperties: false,
          jdk: '',
          properties: [],
          reportBuildPolicy: 'ALWAYS',
          results: [[path: "allure-report"]]
        ]) 
      }
      discordSend customAvatarUrl: "https://cdn-icons-png.flaticon.com/512/573/573131.png?w=740&t=st=1662092610~exp=1662093210~hmac=371422cdcab8bcef11a630644d30876eabb73ac7c0dd627d7ed6360054ae3259", 
      customUsername: "Tests Reporter", 
      title: "${JOB_NAME} ${BUILD_DISPLAY_NAME}", 
      link: "${env.BUILD_URL}/allure", 
      description: "Running on jenkins ${NODE_LABELS}", 
      result: currentBuild.currentResult, 
      footer: "EVOMO", 
      showChangeset: true, 
      thumbnail: discordStatus, 
      webhookURL: "https://discord.com/api/webhooks/1063045911778971678/oG7QZGG0hG9yHmC02UqyUYnk6v-F8SiG9vVJhEB5Z0wj6rNJzW0zTDU5iAdg1XQj_EDc"
      deleteDir()
    }
  }
}