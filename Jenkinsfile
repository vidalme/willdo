pipeline {
    agent any

    stages {
        stage('Download Git') {
            steps {
                git url: 'https://github.com/vidalme/willdo.git', branch: 'main'
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install' 
            }
        }
        stage('build artifact') {
            steps {
                sh 'npm run build'
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

