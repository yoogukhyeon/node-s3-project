const express = require("express");
const router = express.Router();
const moment = require("moment");
const aws = require("aws-sdk");
const config = require(__dirname + "./../config/config.json");
const { v1: uuidv1 } = require("uuid");
const multer = require("multer");
const memorystorage = multer.memoryStorage();
const upload = multer({ stroage: memorystorage });

// s3 이미지 업로드
router.post("/s3/upload", upload.array("img_file"), function (req, res, next) {
	let toDay = moment().format("YYYYMMDD");
	let uploadType = req.body.type;
	let filePath = "";

	try {
		req.files.forEach(function (fileObj, index) {
			let buffer = fileObj.buffer;
			let imgType = fileObj.originalname.split(".");
			let oriName = uuidv1() + "." + imgType[1].toLowerCase();
			let mimeType = fileObj.mimetype;

			aws.config.region = "ap-northeast-2";
			aws.config.update({
				accessKeyId: config.aws.accessKeyId,
				secretAccessKey: config.aws.secretAccessKey,
			});

			filePath = `images/${uploadType}/${toDay}/${oriName}`;
			let s3_params = {
				Bucket: config.aws.bucket,
				Key: filePath,
				ContentType: mimeType,
			};
			let s3obj = new aws.S3({ params: s3_params });
			let url;
			s3obj
				.upload({ Body: buffer })
				.on("httpUploadProgress", function (evt) {
					console.log(evt);
				})
				.send(function (err, data) {
					console.log(err);
					url = data.Location;

					if (!err) {
						res.send({ link: url });
					}
				});
		});
	} catch (e) {
		console.log(e);
	}
});

router.get("/", async (req, res) => {
	try {
		res.render("");
	} catch (err) {
		console.log("Error", err);
	}
});

module.exports = router;
