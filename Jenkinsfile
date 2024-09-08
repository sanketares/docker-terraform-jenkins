pipeline {
    agent any

    environment {
        AWS_ACCESS_KEY_ID     = credentials('aws-access-key-id')
        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
        GITHUB_TOKEN          = credentials('github-token')
        AWS_DEFAULT_REGION    = 'us-west-2'
        DOCKER_IMAGE          = 'your-docker-image'
        S3_BUCKET             = 'your-docker-images-bucket'
        AWS_ECR_URL           = 'your-ecr-url'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/sanketares/Task-2.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build(DOCKER_IMAGE)
                }
            }
        }

        stage('Push Docker Image to AWS ECR') {
            steps {
                script {
                    withAWS(region: AWS_DEFAULT_REGION, credentials: 'aws-credentials-id') {
                        sh 'docker tag ${DOCKER_IMAGE}:latest ${AWS_ECR_URL}/${DOCKER_IMAGE}:latest'
                        sh 'docker push ${AWS_ECR_URL}/${DOCKER_IMAGE}:latest'
                    }
                }
            }
        }

        stage('Upload Docker Image to S3') {
            steps {
                script {
                    sh 'docker save ${DOCKER_IMAGE}:latest | gzip > ${DOCKER_IMAGE}.tar.gz'
                    sh 'aws s3 cp ${DOCKER_IMAGE}.tar.gz s3://${S3_BUCKET}/${DOCKER_IMAGE}.tar.gz'
                }
            }
        }
    }
    
    post {
        always {
            cleanWs() // Clean workspace after build
        }
    }
}
