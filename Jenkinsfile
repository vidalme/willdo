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
                sh 'echo sucessoboyyyy'
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

