import { v2 as cloudinary } from "cloudinary";

const cloudinaryConfig = (_req: any, _res: any, next: any) => {
	cloudinary.config({
		cloud_name: process.env.CLOUDINARY_NAME,
		api_key: process.env.CLOUDINARY_KEY,
		api_secret: process.env.CLOUDINARY_SECRET,
		secure: true,
	});

	next();
};

const { uploader } = cloudinary;

export { cloudinaryConfig, uploader };
