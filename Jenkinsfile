pipeline {
    agent any

    // Trigger via polling every 5 minutes
    triggers {
        pollSCM('H/5 * * * *')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Lint Code') {
            steps {
                sh 'npx eslint .'
            }
        }
        stage('Run Unit Tests') {
            steps {
                sh 'npm test'
            }
        }
    }
    
    post {
        success {
            echo 'Backend pipeline executed successfully!'
        }
        failure {
            echo 'Backend pipeline failed.'
        }
    }
}
