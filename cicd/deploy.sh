#!/bin/bash
cd ..
export ACCOUNT_NUM=712995907128

export TEMP_CREDENTIALS=$(aws sts assume-role --role-arn arn:aws:iam::${ACCOUNT_NUM}:role/cicd --role-session-name simple-api-deploy-session)
export AWS_ACCESS_KEY_ID=$(echo ${TEMP_CREDENTIALS} | jq -r .Credentials.AccessKeyId)
export AWS_SECRET_ACCESS_KEY=$(echo ${TEMP_CREDENTIALS} | jq -r .Credentials.SecretAccessKey)
export AWS_SESSION_TOKEN=$(echo ${TEMP_CREDENTIALS} | jq -r .Credentials.SessionToken)

# Build S3 Folder Name from Repo Name
export API_NAME='simple-api'
export S3_BUCKET=leemdoughty-lambda-bucket
export S3_FILENAME=$(date +"%s")
export S3_FILEKEY=${API_NAME}/${S3_FILENAME}.zip

echo $(sed "s#S3CODEKEY.*#S3CODEKEY=$S3_FILEKEY#; s#S3CODEBUCKET.*#S3CODEBUCKET=$S3_BUCKET#" ./src/env/simple-api.dev.env)

# Package app into dist.zip
#mv node_modules/ node_modules_dev/
#npm install --only=production
npm run build
npm run bundle
#rm -rf node_modules/
#mv node_modules_dev/ node_modules/

# Copy packaged app to S3
aws s3 cp dist.zip s3://$S3_BUCKET/$S3_FILEKEY

# Pull environment specific config from S3
# aws s3 cp s3://$S3_BUCKET/configs/$API_NAME.dev.env $API_NAME.dev.env

sam deploy --template-file ./cicd/sam-ddb-template.yml --stack-name table-stack --no-fail-on-empty-changeset

sam deploy \
  --template-file ./cicd/sam-api-template.yml \
  --stack-name API-$API_NAME \
  --capabilities CAPABILITY_IAM \
  --parameter-overrides $(sed "s#S3CODEKEY.*#S3CODEKEY=$S3_FILEKEY#; s#S3CODEBUCKET.*#S3CODEBUCKET=$S3_BUCKET#" ./src/env/simple-api.dev.env) \
  --no-fail-on-empty-changeset
