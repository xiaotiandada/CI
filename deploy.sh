VERSION="v0.0.1"
SERVERA="SERVERA"
PROJECT_PATH="/usr/local/smart-signature/mttk-quest-test"

echo "Version ${VERSION}"

ls

# sudo yarn
# sudo yarn build

ls

echo "🧑🏻‍💻 删除旧包"

rm -rf build.zip

echo "🧑🏻‍💻 开始打包 📦"

zip -r build.zip build

ls

echo "🧑🏻‍💻 开始上传🚀"

scp -r build.zip ${SERVERA}:${PROJECT_PATH}

ssh ${SERVERA} ls ${PROJECT_PATH}

echo "🧑🏻‍💻 删除旧文件"

ssh ${SERVERA} rm -rf ${PROJECT_PATH}/build

echo "🧑🏻‍💻 解压"

ssh ${SERVERA} unzip -o ${PROJECT_PATH}/build.zip -d ${PROJECT_PATH}

echo "🧑🏻‍💻 Done✅"
