import { uploader } from "../../config/cloudinary";
import { dataUri } from "./../../config/multer";

export const uploadImage = async (req: any) => {
	const file: any = dataUri(req).content;

	const result: any = await uploader.upload(file);
	const image: any = result.url;

	return image;
};
