const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const config = require(__dirname + '/../config/config.json');
const winston = require('./winston');
const Jimp = require('jimp');

let err;
//configuring the AWS environment
AWS.config.update({
  accessKeyId: config.S3.accessKeyId,
  secretAccessKey: config.S3.secretAccessKey
});

const s3 = new AWS.S3();

// limitations
const extensionsAuthorized = ['.jpg','.jpeg','.png'];
const maxUpload = 2000000;
const maxWidth = 1024;

const uploadFile = async (file, folder='folder', fileName='cover') => {

  const extension = path.extname(file.originalname); // .jpg

  // verify the file format
  if(!extensionsAuthorized.includes(extension)){
    err = new Error('error on file format, photo is not a jpg, jpeg or png');
    err.status = 400;
    return err;
  }

  // verify the file size, 2mo max
  if(file.size > maxUpload){
    err = new Error('error on file size exceced the 1.5 mo authorized');
    err.status = 400;
    return err;
  }

  // modify photo before upload
  try {
    // transform file
    let fileToUpload = await Jimp.read(file.buffer);
    let fileFormated = await fileToUpload
      .resize(maxWidth, Jimp.AUTO) // resize
      .quality(60) // set quality
      .getBufferAsync(file.mimetype);

    // prepare the file for s3
    const name = fileName + new Date().getTime() + extension;
    const params = {
      Bucket: config.S3.bucket, // pass your bucket name
      Key: folder + '/' + name, 
      Body: fileFormated
    };
    // upload to s3
    return s3.upload(params).promise();
  } catch (error) {
    return error;
  }

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