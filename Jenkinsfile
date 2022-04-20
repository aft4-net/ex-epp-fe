pipeline{
    
     agent any
    
    stages
   { 
        stage('Git checkout')
        {
            steps{
              git credentialsId: 'jenkins-bitbucket-omeseret', url: 'https://bitbucket.org/Excellerent_Solutions/excellerent-epp-fe'
        
            }
        }
        stage('npm build')
        {
            when {
                 branch 'develop'
             }
         steps{
              sh 'node -v'
              sh 'git branch'
              sh 'git branch -D develop || true'
              sh 'git checkout -b develop origin/develop'
              sh 'npm install'
              sh 'npm run deploy'
            }
        }    
        stage('npm deploy for release')
        {
            when {
                 branch 'release'
             }
         steps{
              sh 'npm -v'
              sh 'git branch -D release || true'
              sh 'git checkout -b release origin/release'
              sh 'git branch'
              sh 'npm install'
              sh 'npm run stage'
            }
        }
        stage('npm deploy for master')
        {
            when {
                 branch 'master'
             }
         steps{
              sh 'npm -v'
             // sh 'git branch -D master || true'
             // sh 'git checkout -b master origin/master'
              sh 'git branch'
              sh 'npm install'
              sh 'npm run deploy'
            }
        }
        stage('Upload to QA S3') {
            when {
                 branch 'release'
             }
            steps{
                script {

                    dir(''){

                    pwd(); //Log current directory

                    withAWS(region:'eu-west-3', credentials: 'blens-aws-key') {

                        def identity=awsIdentity();//Log AWS credentials

                        // Upload files from working directory '' in your project workspace
                        s3Upload(bucket:"qa.epp-excellerentsolutions.com", workingDir:'dist/apps', includePathPattern:'**/*', excludePathPattern:'**/.gitkeep');
                        // invalidate CloudFront distribution
                         cfInvalidate(distribution:'EMYS8NLRZ2ZZY', paths:['/**/*'])
                    }

                };
                cleanWs deleteDirs: true, notFailBuild: true 
            }
          }
        }
                stage('Upload to Prod S3') {
            when {
                 branch 'master'
             }
            steps{
                script {

                    dir(''){

                    pwd(); //Log current directory

                    withAWS(region:'eu-west-3', credentials: 'blens-aws-key') {

                        def identity=awsIdentity();//Log AWS credentials

                        // Upload files from working directory '' in your project workspace
                        s3Upload(bucket:"www.epp-excellerentsolutions.com", workingDir:'dist/apps', includePathPattern:'**/*', excludePathPattern:'**/.gitkeep');
                        // invalidate CloudFront distribution
                         cfInvalidate(distribution:'E3KQRZ3RKXONE', paths:['/**/*'])
                    }

                };
                cleanWs deleteDirs: true, notFailBuild: true 
            }
          }
        }    
        
    
    }

}