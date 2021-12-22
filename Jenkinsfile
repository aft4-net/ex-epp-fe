pipeline{
    
     agent any
    
     environment {
        registry = "blens/epp"
        registryCredential = 'dockerhubID'
      
        
        
    }
    stages
   { 
        stage('Git checkout')
        {
            steps{
              git credentialsId: 'bitbucketpw', url: 'https://bitbucket.org/Excellerent_Solutions/excellerent-epp-fe'
        
            }
        }
        stage('npm run')
        {
           when {
                expression  {
                    BRANCH_NAME == master
                }
            }
            steps{
              sh 'sudo npm run deploy'
            }
        }
   
        stage('Deploy to Staging')
        {
           when {
                expression  {
                    BRANCH_NAME == master
                }
            }
            steps{
                script {
                        withDockerRegistry([ credentialsId: "dockerhubID", url: "" ]) 
                        
                            {
                            sh "docker tag epp:latest blens/eppfe"
                            sh "docker tag timesheet:latest blens/ts"
                            sh "docker tag resource-management:latest blens/rm"
                            sh "docker tag project-management:latest blens/pm"
                            sh "docker tag applicant-tracking:latest blens/at"
                            sh "docker login -u blens -p 0934462336@Bs "
                            sh "docker push blens/eppfe"
                            sh "docker push blens/ts"
                            sh "docker push blens/rm"
                            sh "docker push blens/pm"
                            sh "docker push blens/at"
                            }
                 sshagent(credentials : ['staging']) {
                 
                  
                  sh "rsync -rv --delete -e 'ssh' ./docker-compose.yml ubuntu@18.116.78.75:."  
                  sh "ssh -o StrictHostKeyChecking=no  ubuntu@18.116.78.75 docker login -u blens -p 0934462336@Bs "
                  sh "ssh -o StrictHostKeyChecking=no  ubuntu@18.116.78.75 sudo docker-compose down"
                  sh "ssh -o StrictHostKeyChecking=no  ubuntu@18.116.78.75 sudo docker system prune -af"
                  sh "ssh -o StrictHostKeyChecking=no  ubuntu@18.116.78.75 sudo docker-compose up -d "
                  
                 }
            }
              
            }
        }    
        
    
    }

}