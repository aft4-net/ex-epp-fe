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
              sh 'git checkout -b develop origin/develop'
              sh 'npm install'
              sh 'npm run deploy'
            }
        }    
        stage('npm deploy')
        {
            when {
                 branch 'master'
             }
         steps{
              sh 'npm install'
              sh 'npm run deploy'
            }
        }   
    stage('Deploy to Staging')
        {
           when {
                
                branch 'develop'  
            
            }
            steps{
                script {
                        withDockerRegistry([ credentialsId: "dockerhubID-Blen", url: "" ]) 
                        
                            {
                            sh "docker tag clientmanagement:latest blens/cm"
                            sh "docker tag timesheet:latest blens/ts"
                            sh "docker tag resourcemanagement:latest blens/rm"
                            sh "docker tag projectmanagement:latest blens/pm"
                            sh "docker tag applicant-tracking:latest blens/at"
                            sh "docker tag usermanagement:latest blens/um"
                            sh "docker tag epp-dashboard:latest blens/epp-dash"
                            sh "docker tag configurationmodule:latest blens/configuration"
                           
                            
                            sh "docker push blens/cm"
                            sh "docker push blens/ts"
                            sh "docker push blens/rm"
                            sh "docker push blens/pm"
                            sh "docker push blens/at"
                            sh "docker push blens/um"
                            sh "docker push blens/epp-dash"
                            sh "docker push blens/configuration"
                            
                            }
                 sshagent(credentials : ['staging']) {
                 
                  
                  sh "rsync -rv --delete -e 'ssh' ./docker-compose.yml ubuntu@18.218.150.53:/home/ubuntu/deployment"  
                  
                  sh "ssh -o StrictHostKeyChecking=no  ubuntu@18.218.150.53 sudo docker-compose -f /home/ubuntu/deployment/docker-compose.yml down"
                  sh "ssh -o StrictHostKeyChecking=no  ubuntu@18.218.150.53 sudo docker system prune -af"
                  sh "ssh -o StrictHostKeyChecking=no  ubuntu@18.218.150.53 sudo docker-compose -f /home/ubuntu/deployment/docker-compose.yml up -d "
                  
                 }
            }
            //clean the workspace after deployment 
            cleanWs deleteDirs: true, notFailBuild: true 
            }
        }    
        
    
    }

}