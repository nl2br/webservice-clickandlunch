const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const config = require(__dirname + '/../config/config.json');
const winston = require('./winston');

//configuring the AWS environment
AWS.config.update({
  accessKeyId: config.S3.accessKeyId,
  secretAccessKey: config.S3.secretAccessKey
});

var s3 = new AWS.S3();

const uploadFile = (fileName) => {
  fs.readFile(fileName, (err, data) => {
     if (err) throw err;
     const params = {
        Bucket: config.S3.bucket, // pass your bucket name
        Key: 'folder/' + fileName, // file will be saved as testBucket/contacts.csv
        Body: fs.createReadStream(fileName),
        // ACL: 'public-read'
     };
     s3.upload(params, function(s3Err, data) {
         if (s3Err) throw s3Err
         winston.info(`File uploaded successfully at ${data.Location}`)
     });
  });
};

const requestFile = (fileName) => {
  //construct getParam
  let getParams = {
    Bucket: config.S3.bucket,
    Key: 'folder/'+fileName 
  };

  //Fetch or read data from aws s3
  s3.getObject(getParams, function (err, data) {
    if (err) throw err;
    winston.info(data.Body.toString());
  });
};

module.exports = { uploadFile, requestFile };