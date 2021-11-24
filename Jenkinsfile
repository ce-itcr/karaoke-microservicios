pipeline {
    agent any
    stages {

        stage ('Build') {
            steps{
                sshPublisher(publishers: [sshPublisherDesc(configName: 'SSHconnection', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: 'bash build.sh testing', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
            }
        }

        stage ('Test') {
            steps{
                sshPublisher(publishers: [sshPublisherDesc(configName: 'SSHconnection', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: 'bash test.sh', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
            }
        }

        stage ('Deploy') {
            steps{
                sshPublisher(publishers: [sshPublisherDesc(configName: 'SSHconnection', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: 'bash deploy.sh', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
            }
        }

    }
}