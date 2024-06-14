pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'admin-flow', url: 'https://github.com/AhamedMinhaj456/Motorbike_Service_Station_Reservation_System'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    dir('frontend') {
                        docker.build('admin-flow-frontend')
                    }
                }
            }
        }
        
        stage('Run Container') {
            steps {
                script {
                    def dockerImage = docker.image('admin-flow-frontend')
                    def dockerContainer = dockerImage.run('-p 3000:3000', '--name admin-flow-container')

                    env.CONTAINER_ID = dockerContainer.id
                }
            }
        }
    }
    
}
