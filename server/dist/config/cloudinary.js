"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploader = exports.cloudinaryConfig = void 0;
const cloudinary_1 = require("cloudinary");
const cloudinaryConfig = (_req, _res, next) => {
    cloudinary_1.v2.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
        secure: true,
    });
    next();
};
exports.cloudinaryConfig = cloudinaryConfig;
const { uploader } = cloudinary_1.v2;
exports.uploader = uploader;
//# sourceMappingURL=cloudinary.js.map