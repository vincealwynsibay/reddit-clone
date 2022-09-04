import multer from "multer";
import DatauriParser from "datauri/parser";
import path from "path";

const storage = multer.memoryStorage();

const parser = new DatauriParser();
export const multerUpload = multer({ storage });

export const dataUri = (req: any) => {
	return parser.format(
		path.extname(req.file.originalname).toString(),
		req.file.buffer
	);
};
