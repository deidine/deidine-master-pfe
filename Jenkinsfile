//https://medium.com/@abderrahimfazazi/set-up-ci-cd-using-jenkins-for-your-nextjs-app-db933ac87e93
//use ngrok to translate the 8080 to be https and notify hok by github
pipeline {
    agent any
    environment {
        NEXT_PUBLIC_SUPABASE_URL='https://vendenuypyihccxscwia.supabase.co' 
        NEXT_PUBLIC_SUPABASE_ANON_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZlbmRlbnV5cHlpaGNjeHNjd2lhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMzNDYzNDgsImV4cCI6MjAyODkyMjM0OH0.vL2Ikt1WSu2E2d0GqTBiiPfguvF_DqhhVzIGSMDIDRg'
 
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
                bat 'npm run build'
            }
        }
        // stage('Test') {
        //     steps {
        //         // Run tests if any are defined
        //         bat 'npm test'
        //     }
        // }
        stage('Deploy') {
            steps {
                // Deploy application (this is a placeholder; modify as needed)
   bat 'start /b npm run start'
            }
        }
    }
  post {
        success {
            script {
                githubNotify(
                    context: 'Jenkins CI/CD',
                    status: 'SUCCESS',
                    description: 'Deployment completed successfully',
                    targetUrl: env.BUILD_URL
                )
            }
        }
        failure {
            script {
                githubNotify(
                    context: 'Jenkins CI/CD',
                    status: 'FAILURE',
                    description: 'Deployment failed',
                    targetUrl: env.BUILD_URL
                )
            }
        }
    }
}
