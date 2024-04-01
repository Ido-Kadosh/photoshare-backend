import AWS from 'aws-sdk';

import { Request, Response } from 'express';

AWS.config.update({
	region: process.env.BUCKET_REGION,
	accessKeyId: process.env.ACCESS_KEY,
	secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

export const getPresignedUrl = async (req: Request, res: Response) => {
	const { fileName, fileType } = req.query;

	if (typeof fileName !== 'string' || typeof fileType !== 'string') {
		return res.status(400).send('invalid fileName or fileType');
	}

	if (!fileName || !fileType || !fileName.trim() || !fileType.trim()) {
		return res.status(400).send('fileName and fileType are required.');
	}

	const fileNameRegex = /^[a-zA-Z0-9_.-]+$/;
	if (!fileNameRegex.test(fileName) || fileName.includes('/') || fileName.includes('\\')) {
		return res.status(400).send('Invalid fileName.');
	}

	const fileTypeRegex = /^(image\/.*|video\/.*)$/;
	if (!fileTypeRegex.test(fileType)) {
		return res.status(400).send('Unsupported fileType. Allowed types are image/* and video/*.');
	}

	const params = {
		Bucket: process.env.BUCKET_NAME,
		Key: `uploads/${fileName}`,
		Expires: 60, // time in seconds
		ContentType: fileType,
		ACL: 'bucket-owner-full-control',
	};

	try {
		// Generate a pre-signed PUT URL for direct uploads
		const url = await s3.getSignedUrlPromise('putObject', params);
		res.json({ url });
	} catch (error) {
		console.error('Error generating S3 pre-signed URL', error);
		res.status(500).send('Error generating S3 pre-signed URL');
	}
};
