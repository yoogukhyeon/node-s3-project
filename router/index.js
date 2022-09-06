const express = require('express');
const router = express.Router();
const moment = require('moment');
const aws = require('aws-sdk');
const config = require(__dirname + "./../config/config.json");
const { v1 : uuidv1} = require('uuid');
const multer = require('multer');
const memorystorage = multer.memoryStorage();
const upload = multer({stroage : memorystorage});

console.log(config.aws);
console.log(uuidv1)

// s3 이미지 업로드
router.post('/upload', upload.array('img_file'), function(req, res, next) {
    var toDay = moment().format('YYYYMMDD');
    var uploadType = req.body.type;
    var filePath = '';

    try{
     /*    req.files.forEach(function (fileObj, index){
            var buffer =  fileObj.buffer;
            //var oriName = fileObj.originalname;
            var imgType = fileObj.originalname.split('.');
            var oriName = uuidv1()+'.'+imgType[1].toLowerCase();
            var mimeType = fileObj.mimetype;
            aws.config.region = 'ap-northeast-2'; //Seoul
            aws.config.update({
                accessKeyId : config.aws.accessKey,
                secretAccessKey : config.aws.secretKey
            });
            filePath = 'images/'+uploadType+'/'+toDay+'/'+oriName;
            var s3_params = {
                Bucket : config.aws.bucket,
                Key : filePath,
                ContentType : mimeType
            }
            var s3obj = new aws.S3({ params: s3_params });
            s3obj.upload({Body : buffer}).
                on('httpUploadProgress', function (evt) { console.log(evt) }).
                send(function (err, data) {
                console.log(err);
                var url = data.Location;
                if(!err){
                    res.send({link : imgDomain+filePath});
                }
            })
        }); */
    }catch(e){
        console.log(e);
    }
});


/* // Set the region 
AWS.config.update({region: 'us-west-2', accessKeyId : "AKIA2R3ARBJU76QV7XFS" ,secretAccessKey : "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"});

// Create S3 service object
s3 = new AWS.S3({apiVersion: '2006-03-01'});

// Call S3 to list the buckets
s3.listBuckets(function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Buckets);
  }
}); */




router.get('/', async(req, res) => {
    try{

        res.render('');
    }catch(err){
        console.log("Error", err);
    };
});
 








module.exports = router;