const AWSConfig = require('aws-sdk');

AWSConfig.config.update({
  accessKeyId: 'accessKeyGoesHere',
  secretAccessKey: 'secretKeyGoesHere',
  region: 'us-east-1', // e.g., 'us-east-1'
});


export default AWSConfig;


