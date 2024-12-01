//https://medium.com/@abderrahimfazazi/set-up-ci-cd-using-jenkins-for-your-nextjs-app-db933ac87e93
//use ngrok to translate the 8080 to be https and notify hok by github
pipeline {
    agent any
    environment {
        NODE_ENV = 'production'
    }
    stages {
        stage('Checkout') {
            steps {
                // Clone the repository
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                // Install project dependencies
                // sh 'npm install' for lunix
                bat 'npm install'
            }
        }
        stage('Build') {
            steps {
                // Build the Next.js application
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                // Run tests if any are defined
                bat 'npm test'
            }
        }
        stage('Deploy') {
            steps {
                // Deploy application (this is a placeholder; modify as needed)
                bat 'npm run start'
            }
        }
    }
    post {
        always {
            // Cleanup or notify on pipeline completion
            echo 'Pipeline finished.'
        }
        success {
            echo 'Build and deployment succeeded!'
        }
        failure {
            echo 'Build or deployment failed.'
        }
    }
}
