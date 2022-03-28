pipeline {

  agent any

  stages {
            stage('Git checkout')
        {
            steps{
              git credentialsId: 'jenkins-bitbucket-omeseret', url: 'https://bitbucket.org/Excellerent_Solutions/excellerent-epp-fe'
        
            }
        }  
    stage('npm deploy')
        {
         steps{
              sh 'npm -v'
              sh 'git branch'
              sh 'npm install'
              sh 'npm run deploy'
            }
        }  
    stage('Upload to S3') {
        steps{
            script {

                dir(''){

                    pwd(); //Log current directory

                    withAWS(region:'eu-west-3', credentials: 'omeseret-aws-cred') {

                        def identity=awsIdentity();//Log AWS credentials

                        // Upload files from working directory '' in your project workspace
                        s3Upload(bucket:"www.epp-excellerentsolutions.com", workingDir:'dist/apps', includePathPattern:'**/*', excludePathPattern:'**/.gitkeep');
                        // invalidate CloudFront distribution
                        cfInvalidate(distribution:'E3WDXQPENQXJU', paths:['/**/*'])
                    }

                };
                cleanWs deleteDirs: true, notFailBuild: true 
            }
        }
    }

  }

}