pipeline {
  agent {
    docker {
      image: 'node:alpine'
    }
  }
  options {
    // 添加日志打印时间
    timestamps()
    // 设置全局超时
    timeout(time: 10, unit: 'MINUTES')
  }
  stages {
    stage('checkout') {
      options {
          timeout(time: 2, unit: 'MINUTES')
      }
      steps {
        sh "echo hi"
      }
    }
    stage('Npm Build') {
      options {
          timeout(time: 2, unit: 'MINUTES')
      }
      steps {
        sh "npm -v"
      }
    }
    stage('docker') {
      options {
          timeout(time: 2, unit: 'MINUTES')
      }
      steps {
        sh "docker -v"
      }
    }
  }
}