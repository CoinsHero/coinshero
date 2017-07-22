#!/usr/bin/env bash

S3_BUCKET_URL=$1
S3URL="${S3_BUCKET_URL}/$2"
GRANTS=$3
NUM_OF_DAYS_UNTIL_EXPIRATION=$4
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

Print "Clear the previous folder and backup with current latest"

aws s3 rm ${S3URL}/previous/ --recursive
aws s3 cp ${S3URL}/latest ${S3URL}/previous --recursive --exclude "*" --include "*.html" ${GRANTS}

Print "Sync files (only updated / additions) from the local dist folder to the S3 latest folder"

aws s3 sync ./dist/ ${S3URL}/latest/ --exclude "*.html" --exclude "*.svg" ${GRANTS}  --cache-control "public, max-age=31536000"
aws s3 sync ./dist/ ${S3URL}/latest/ --exclude "*" --include "*.svg" ${GRANTS} --cache-control "public, max-age=31536000" --content-type image/svg+xml
aws s3 sync ./dist/ ${S3URL}/latest/ --exclude "*" --include "*.html" ${GRANTS} --cache-control no-cache

# on mac
olderThan=`date -j -v-"${NUM_OF_DAYS_UNTIL_EXPIRATION}"d +%s`
# on linux
#olderThan=`date -d "-${NUM_OF_DAYS_UNTIL_EXPIRATION} days" +%s`

Print "Remove files older than: ${olderThan} (${NUM_OF_DAYS_UNTIL_EXPIRATION} days) from the latest folder"

aws s3 ls ${S3URL}/latest --recursive | while read -r line;
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

Print "Cleaning up the AWS credentials"

rm -rf ~/.aws/config
rm -rf ~/.aws/credentials

Print "All Done :)"
