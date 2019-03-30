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

const s3 = new AWS.S3();

const uploadFile = (file, folder='folder') => {
  const extension = path.extname(file.originalname); // .jpg
  const fileName = 'cover' + extension;
  const params = {
    Bucket: config.S3.bucket, // pass your bucket name
    Key: folder + '/' + 'cover' + extension, 
    Body: file.buffer
  };
  return s3.upload(params).promise();
};
    
const requestFile = (file) => {
  //construct getParam
  let getParams = {
    Bucket: config.S3.bucket,
    Key: 'folder/'+file 
  };

  //Fetch or read data from aws s3
  s3.getObject(getParams, function (err, data) {
    if (err) throw err;
    winston.info(data.Body.toString());
  });
};

module.exports = { uploadFile, requestFile };