pipeline{
    
     agent any
    
     environment {
        registry = "blens/epp"
        registryCredential = 'dockerhubID-Blen'
    }
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
              sh 'git branch -D develop && git checkout -b develop origin/develop'
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
              sh 'git checkout origin/release'
              sh 'npm install'
              sh 'npm run deploy'
            }
        }   
    stage('Upload to S3') {
            when {
                 branch 'release'
             }
        steps{
            script {

                dir(''){

                    pwd(); //Log current directory

                    withAWS(region:'eu-west-3', credentials: 'omeseret-aws-cred') {

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
        
    
    }

}