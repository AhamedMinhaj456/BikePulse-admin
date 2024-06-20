pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/AhamedMinhaj456/BikePulse-admin'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image using the Dockerfile in the root directory
                    docker.build('bikepulse-admin', '.')
                }
            }
        }
        
        stage('Run Container') {
            steps {
                script {
                    // Run the Docker container from the built image
                    def dockerImage = docker.image('bikepulse-admin')
                    def dockerContainer = dockerImage.run('-p 3000:3000 --name admin-flow-container')

                    env.CONTAINER_ID = dockerContainer.id
                }
            }
        }
    }
}