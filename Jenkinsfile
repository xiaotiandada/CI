// TODO： 需要清理aliyun仓库
pipeline {
  agent any
  options {
    // 添加日志打印时间
    timestamps()
    // 设置全局超时
    timeout(time: 10, unit: 'MINUTES')
  }
  // https://www.jenkins.io/zh/doc/book/pipeline/syntax/#agent-parameters
  parameters {
    // 选择模式
    choice(
      name: 'MODE',
      choices: ['deploy', 'rollback'],
      description: 'Please choose to publish or rollback'
    )
    // 选择分支
    choice(
      name: 'GITHUB_BRANCH',
      choices: ['main', 'develop'],
      description: 'Please select a branch'
    )
    // 回滚版本号
    string(name: 'ROLLBACK_VERSION', defaultValue: 'xx-xx-xx', description: '构建历史版本号，回滚必填！ https://cr.console.aliyun.com/repository/cn-shanghai/docker-aliyun-space/docker/images')
  }
  // https://www.jenkins.io/zh/doc/book/pipeline/syntax/#%E5%86%85%E7%BD%AE%E6%9D%A1%E4%BB%B6
  environment {
    VERSION='0.01'
    DOCKER_USER=""
    DOCKER_PASSWORD=""
    DOCKER_REGISTRY="registry.cn-shanghai.aliyuncs.com"
    DOCKER_SPACE="docker-aliyun-space"
    DOCKER_WAREHOUSE="docker"
    IMAGE_NAME='docker-vue'
    IMAGE_VERSION="0.0.1"
    TIME=sh(script: "echo `date '+%Y%m%d%H%M%S'`", returnStdout: true).trim()
    SERVER_A=""
  }
  stages {
    stage('Init') {
      steps {
        sh 'echo Version: ${VERSION};echo TIME: ${TIME}'
      }
    }
    stage('Git Pull') {
      when {
        environment name: 'MODE',value: 'deploy'
      }
      options {
          timeout(time: 2, unit: 'MINUTES')
      }
      steps {
        git (
          url: 'https://github.com/xiaotiandada/docker.git',
          branch: '${GITHUB_BRANCH}'
        )
      }
    }
    stage('Yarn Build') {
      when {
        environment name: 'MODE',value: 'deploy'
      }
      steps {
        // sh 'yarn'
        // sh 'yarn build'
        sh 'ls'
      }
    }
    stage('Docker Build') {
      when {
        environment name: 'MODE',value: 'deploy'
      }
      steps {
        sh 'docker-compose build'
      }
    }
    stage('Docker Push') {
      when {
        environment name: 'MODE',value: 'deploy'
      }
      steps {
        sh 'docker login --username=${DOCKER_USER} --password ${DOCKER_PASSWORD} ${DOCKER_REGISTRY}'
        sh 'docker tag ${IMAGE_NAME} ${DOCKER_REGISTRY}/${DOCKER_SPACE}/${DOCKER_WAREHOUSE}:${IMAGE_NAME}-${IMAGE_VERSION}-${TIME}'
        sh 'docker push ${DOCKER_REGISTRY}/${DOCKER_SPACE}/${DOCKER_WAREHOUSE}:${IMAGE_NAME}-${IMAGE_VERSION}-${TIME}'
        sh 'docker rmi ${DOCKER_REGISTRY}/${DOCKER_SPACE}/${DOCKER_WAREHOUSE}:${IMAGE_NAME}-${IMAGE_VERSION}-${TIME}'
      }
    }
    stage('Deploy') {
      when {
        environment name: 'MODE',value: 'deploy'
      }
      steps {
        sh 'ssh ${SERVER_A} docker login --username=${DOCKER_USER} --password ${DOCKER_PASSWORD} ${DOCKER_REGISTRY}'
        sh 'ssh ${SERVER_A} docker pull ${DOCKER_REGISTRY}/${DOCKER_SPACE}/${DOCKER_WAREHOUSE}:${IMAGE_NAME}-${IMAGE_VERSION}-${TIME}'
        sh 'ssh ${SERVER_A} docker image ls'
        // 需要判断容器是否存在 考虑执行sh脚本 还需要研究，否则需要先生成容器再执行停止和删除
        // 因为不会写更厉害的语句 用script returnStatus 防止报错...
        sh(script: 'ssh ${SERVER_A} docker stop ${IMAGE_NAME}', returnStatus: true)
        sh(script: 'ssh ${SERVER_A} docker rm ${IMAGE_NAME}', returnStatus: true)
        sh 'ssh ${SERVER_A} docker run -d -p 3000:3000 --name ${IMAGE_NAME} ${DOCKER_REGISTRY}/${DOCKER_SPACE}/${DOCKER_WAREHOUSE}:${IMAGE_NAME}-${IMAGE_VERSION}-${TIME}'
      }
    }
    stage('Rollback') {
      when {
        environment name: 'MODE',value: 'rollback'
      }
      steps {
        sh 'echo rollback ${ROLLBACK_VERSION}'
        sh 'ssh ${SERVER_A} docker login --username=${DOCKER_USER} --password ${DOCKER_PASSWORD} ${DOCKER_REGISTRY}'
        sh 'ssh ${SERVER_A} docker pull ${DOCKER_REGISTRY}/${DOCKER_SPACE}/${DOCKER_WAREHOUSE}:${ROLLBACK_VERSION}'
        sh 'ssh ${SERVER_A} docker image ls'
        // 需要判断容器是否存在 考虑执行sh脚本 还需要研究，否则需要先生成容器再执行停止和删除
        // 因为不会写更厉害的语句 用script returnStatus 防止报错...
        sh(script: 'ssh ${SERVER_A} docker stop ${IMAGE_NAME}', returnStatus: true)
        sh(script: 'ssh ${SERVER_A} docker rm ${IMAGE_NAME}', returnStatus: true)
        sh 'ssh ${SERVER_A} docker run -d -p 3000:3000 --name ${IMAGE_NAME} ${DOCKER_REGISTRY}/${DOCKER_SPACE}/${DOCKER_WAREHOUSE}:${ROLLBACK_VERSION}'
      }
    }
  }
}

// docker push registry.cn-shanghai.aliyuncs.com/docker-aliyun-space/docker:[镜像版本号]
// sudo docker tag 36e223660e1c registry.cn-shanghai.aliyuncs.com/docker-aliyun-space/docker:0.7-dfb6816
// docker push registry.cn-shanghai.aliyuncs.com/docker-aliyun-space/docker:0.7-dfb6816

// docker ps -a | grep -w registry.cn-shanghai.aliyuncs.com/docker-aliyun-space/docker:0.0.1-20210219234740 | awk '{print $1}'
// docker ps | grep -w registry.cn-shanghai.aliyuncs.com/docker-aliyun-space/docker:0.0.1-20210219234740 | awk '{print $1}'

// docker stop `docker ps | grep registry.cn-shanghai.aliyuncs.com/docker-aliyun-space/docker:docker-vue1 |awk '{print  $1}'|sed 's/%//g' | print '111'`