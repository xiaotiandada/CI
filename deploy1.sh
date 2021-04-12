VERSION="v0.0.1"
SERVERA="SERVERA"
PROJECT_PATH=""

echo "Version ${VERSION}"


echo "🧑🏻‍💻 开始构建后端"

ls
sudo npm i
sudo npm run stop && sudo npm run start
ls

echo "🧑🏻‍💻 后端 Done✅"



ls

sudo yarn
sudo yarn build

echo "🧑🏻‍💻 开始构建前端"

ls

echo "🧑🏻‍💻 删除旧包"

rm -rf dist.zip

echo "🧑🏻‍💻 开始打包 📦"

zip -r dist.zip dist

ls

echo "🧑🏻‍💻 开始上传🚀"

scp -r dist.zip ${SERVERA}:${PROJECT_PATH}

ssh ${SERVERA} ls ${PROJECT_PATH}

echo "🧑🏻‍💻 删除旧文件"

ssh ${SERVERA} rm -rf ${PROJECT_PATH}/dist

echo "🧑🏻‍💻 解压"

ssh ${SERVERA} unzip -o ${PROJECT_PATH}/dist.zip -d ${PROJECT_PATH}

echo "🧑🏻‍💻 Done✅"