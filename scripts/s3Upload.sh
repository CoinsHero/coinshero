#!/usr/bin/env bash

S3_BUCKET_URL=$1
S3URL="${S3_BUCKET_URL}"
GRANTS=$2
NUM_OF_DAYS_UNTIL_EXPIRATION=$3
CLOUDFRONT_DISTRIBUTION_ID=$4
AWS_ACCESS_KEY_ID=$5
AWS_SECRET_ACCESS_KEY=$6

Print() {
  echo ""
  echo "###################################################################"
  echo "$1"
  echo "###################################################################"
}

aws configure set aws_access_key_id ${AWS_ACCESS_KEY_ID}
aws configure set aws_secret_access_key ${AWS_SECRET_ACCESS_KEY}

Print "Sync files (only updated / additions) from the local dist folder to the S3 folder"

aws s3 sync ./dist/ ${S3URL}/ --exclude "*.html" --exclude "*.svg" ${GRANTS}  --cache-control "public, max-age=31536000"
aws s3 sync ./dist/ ${S3URL}/ --exclude "*" --include "*.svg" ${GRANTS} --cache-control "public, max-age=31536000" --content-type image/svg+xml
aws s3 sync ./dist/ ${S3URL}/ --exclude "*" --include "*.html" ${GRANTS} --cache-control no-cache

# on mac
olderThan=`date -j -v-"${NUM_OF_DAYS_UNTIL_EXPIRATION}"d +%s`
# on linux
#olderThan=`date -d "-${NUM_OF_DAYS_UNTIL_EXPIRATION} days" +%s`

Print "Remove files older than: ${olderThan} (${NUM_OF_DAYS_UNTIL_EXPIRATION} days)"

aws s3 ls ${S3URL} --recursive | while read -r line;
  do
      createDate=`echo \$line | awk {'print \$1'}`
      filePath=`echo \$line | awk {'print \$4'}`

      # on mac
      createDate=`date -j -f "%F" \$createDate +"%s"`
      # on linux
      # createDate=`date -d \$createDate +%s`

      # checking that the file is older than $numOfDaysUntilExpiration and that it is not empty(happens for the first line - shows the folder properties)
      if [[ "${createDate}" -lt "${olderThan}" ]] && [[ "${filePath}" != "" ]]
        then
          fileToDelete="${S3_BUCKET_URL}/${filePath}"
          aws s3 rm "${fileToDelete}"
      fi
  done;

Print "Invalidate CloudFront"

# In our CloudFront distribution you should specify that the minimum TTL would be 31536000
# That way we actually cache our index.html in CF and it doesn't have to go all the way to S3.
# However, for our browser it will ALWAYS go to CF to get the file since it has Cache-Control: no-cache
# So we're faster now, but in order to deploy new code we have to create an invalidation otherwise CF will keep the index.html file for
# 1 year (=31536000).

aws configure set preview.cloudfront true
aws cloudfront create-invalidation --distribution-id "${CLOUDFRONT_DISTRIBUTION_ID}" --paths '/*'

Print "Cleaning up the AWS credentials"

rm -rf ~/.aws/config
rm -rf ~/.aws/credentials

Print "All Done :)"
