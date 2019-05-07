export TEMP_CREDENTIALS=$(aws sts assume-role --role-arn arn:aws:iam:::role/cicd --role-session-name simple-api-deploy-session)
export AWS_ACCESS_KEY_ID=$(echo ${TEMP_CREDENTIALS} | jq -r .Credentials.AccessKeyId)
export AWS_SECRET_ACCESS_KEY=$(echo ${TEMP_CREDENTIALS} | jq -r .Credentials.SecretAccessKey)
export AWS_SESSION_TOKEN=$(echo ${TEMP_CREDENTIALS} | jq -r .Credentials.SessionToken)
# Build S3 Folder Name from Repo Name
export API_NAME='simple-api'
export S3_BUCKET='leemdoughty-lambda-bucket'

# Package app into dist.zip
npm run build
npm prune --production
npm dedupe
npm run bundle
# Copy packaged app to S3
aws s3 cp dist.zip s3://$S3_BUCKET/$API_NAME/$API_NAME.zip --quiet

sam deploy --template-file sam-ddb-template.yml --stack-name table-stack --no-fail-on-empty-changeset

sam deploy --template-file sam-api-template.yml --stack-name API-$API_NAME --capabilities CAPABILITY_IAM  --parameter-overrides $(cat secrets.dev.env) --no-fail-on-empty-changeset
