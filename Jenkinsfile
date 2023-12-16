pipeline {
    agent any

    stages {
        stage('Download Git') {
            steps {
                git url: 'https://github.com/vidalme/willdo.git', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Run Unit Tests') {
            steps {
                sh 'npm run test'
            }
        }

        stage('Deploy to Staging (Optional)') {
            when {
                expression {
                    return params.DEPLOY_TO_STAGING == 'true'
                }
            }
            steps {
                // Script to deploy your app to the staging environment
            }
        }
    }

    post {
        success {
            echo 'Build and tests successful!'
        }
        failure {
            echo 'Build or tests failed!'
        }
    }
}
