const GRANTS = '--grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers';
const NUM_OF_DAYS_UNTIL_EXPIRATION = 40;

try {
  const hiddenData = require('./hiddenS3Data.json');
  const CLOUDFRONT_DISTRIBUTION_ID = hiddenData[process.env.AWS_ENV].CLOUDFRONT_DISTRIBUTION_ID;

  // eslint-disable-next-line max-len
  const command = `bash ./scripts/s3Upload.sh "${hiddenData[process.env.AWS_ENV].S3_BUCKET_URL}" "${GRANTS}" ${NUM_OF_DAYS_UNTIL_EXPIRATION} ${CLOUDFRONT_DISTRIBUTION_ID} ${hiddenData.AWS_ACCESS_KEY_ID} ${hiddenData.AWS_SECRET_ACCESS_KEY}`;
  try {
    require('child_process').execSync(command, {stdio: [process.stdin, process.stdout, process.stderr]});
  } catch (e) {
    console.log(`Something went wrong: ${JSON.stringify(e)}`);
  }
} catch (e) {
  console.log('You seem to be missing the hiddenS3UploadCredentials.json file (or we couldn\'t read it for some reason..). Get it and come back');
}
