def discordStatus = ""
def filename = ""
pipeline {
    agent {
        docker {
            image 'cypress/included:10.11.0'
            args '-u root'
        }
    }

  stages {
    stage('Setup Node.js') {
      steps {
        // Install Node.js LTS (menggunakan nvm)
        sh '''
        if [ -x "$(command -v nvm)" ]; then
          nvm install --lts
          nvm use --lts
        else
          echo "NVM not installed, skipping..."
        fi
        '''
        // Atau pastikan versi node sudah benar
        sh 'node -v'
      }
    }

    stage('Install Dependencies') {
      steps {
        // Hapus node_modules dan install ulang
        sh 'rm -rf node_modules package-lock.json'
        sh 'npm install'
      }
    }

    stage('Clear Cypress Cache') {
      steps {
        sh 'rm -rf ~/Library/Caches/Cypress'
      }
    }

    stage('Debug Environment') {
      steps {
        sh 'node -v'
        sh 'npx cypress --version'
      }
    }

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
            // if(JOB_NAME == 'anc-jastir' && day == 0 && hour == 2) {
            if(JOB_NAME == 'anc-jastir') {
              filename = "Usage (Superadmin)"
              retry(3) {
                sh "npx cypress run --browser chrome --spec 'cypress/e2e/superadmin/check-anomaly.cy.js' --env allure=true"
              }
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
