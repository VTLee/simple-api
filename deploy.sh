# export TEMP_CREDENTIALS=$(aws sts assume-role --profile cicd --role-session-name simple-api-deploy-session)
# export AWS_ACCESS_KEY_ID=$(echo ${TEMP_CREDENTIALS} | jq -r .Credentials.AccessKeyId)
# export AWS_SECRET_ACCESS_KEY=$(echo ${TEMP_CREDENTIALS} | jq -r .Credentials.SecretAccessKey)
# export AWS_SESSION_TOKEN=$(echo ${TEMP_CREDENTIALS} | jq -r .Credentials.SessionToken)
# Build S3 Folder Name from Repo Name
export API_NAME='simple-api'
export S3_BUCKET='leemdoughty-lambda-bucket'
export S3_KEY="$API_NAME/$(date +'%s').zip"

# Package app into dist.zip
if [[ -d 'node_modules/' ]]; then
    echo "Clearing node modules"
    rm -rf node_modules/
fi
npm install
npm run build
# npm prune --production
# npm dedupe
npm run bundle
# Copy packaged app to S3
aws s3 --profile cicd cp dist.zip s3://$S3_BUCKET/${S3_KEY} --quiet
# Pull environment specific config from S3
#aws s3 cp s3://$S3_BUCKET/configs/$API_NAME.dev.env $API_NAME.dev.env


# Replace S3 folder and filename placeholders sam-api-template
sed "s#^S3CODEBUCKET.*#S3CODEBUCKET=${S3_BUCKET}#" src/env/simple-api.dev.env > dist.env
sed -i "s#^S3CODEKEY.*#S3CODEKEY=${S3_KEY}#" dist.env
cat dist.env 
echo "Deploting DDB Template"
sam deploy --profile cicd --template-file sam-ddb-template.yml --stack-name DDB-table-stack --no-fail-on-empty-changeset
echo "Deploting API Template"
cat dist.env
sam deploy --profile cicd --template-file sam-api-template.yml --stack-name API-$API_NAME --capabilities CAPABILITY_IAM  --parameter-overrides $(cat dist.env) --no-fail-on-empty-changeset

# npm install