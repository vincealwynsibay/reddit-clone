"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const multer_1 = require("./../../config/multer");
const uploadImage_1 = require("./../lib/uploadImage");
const express_1 = __importDefault(require("express"));
const profileModel_1 = __importDefault(require("../models/profileModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    return res.json("nice");
});
router.post("/upload", multer_1.multerUpload.single("image"), async (req, res) => {
    try {
        if (req.file) {
            const image = await (0, uploadImage_1.uploadImage)(req);
            return res.json({
                message: "Your image has been uploded successfully to cloudinary",
                data: { image },
            });
        }
    }
    catch (err) {
        console.error(err);
    }
});
router.put("/me/avatar", passport_1.default.authenticate("jwt", { session: false }), multer_1.multerUpload.single("file"), async (req, res) => {
    try {
        if (req.file) {
            const image = await (0, uploadImage_1.uploadImage)(req);
            let user = req.user.email;
            user = await userModel_1.default.findOne({ email: user });
            let profile = await profileModel_1.default.findOne({ _id: user._id });
            profile.avatar = image;
            profile = await profile.save();
            return res.json({ ok: true, profile });
        }
        return res.json({ ok: false });
    }
    catch (err) {
        console.error(err);
    }
});
router.put("/me/banner", passport_1.default.authenticate("jwt", { session: false }), multer_1.multerUpload.single("file"), async (req, res) => {
    try {
        if (req.file) {
            const image = await (0, uploadImage_1.uploadImage)(req);
            let user = req.user._id;
            let profile = await profileModel_1.default.findOne({ _id: user });
            profile.banner = image;
            profile = await profile.save();
            return res.json({ ok: true, profile });
        }
        return res.json({ ok: false });
    }
    catch (err) {
        console.error(err);
    }
});
router.put("/me/desc", passport_1.default.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { description } = req.body;
        let user = req.user._id;
        let profile = await profileModel_1.default.findById(user);
        if (profile === null) {
            throw new Error("Profile not found");
        }
        profile.description = description;
        await profile.save();
        res.json({ ok: true });
    }
    catch (err) {
        console.error(err);
    }
});
router.put("/me/desc", passport_1.default.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { gender } = req.body;
        let user = req.user._id;
        let profile = await profileModel_1.default.findById(user);
        if (profile === null) {
            throw new Error("Profile not found");
        }
        profile.gender = gender;
        await profile.save();
        res.json({ ok: true });
    }
    catch (err) {
        console.error(err);
    }
});
router.put("/me/desc", passport_1.default.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { twitter, instagram, facebook, spotify, tiktok, discord } = req.body;
        let user = req.user._id;
        const socialLinks = {
            twitter,
            instagram,
            facebook,
            spotify,
            tiktok,
            discord,
        };
        profileModel_1.default.findByIdAndUpdate(user, {
            $set: { socialLinks },
        });
        res.json({ ok: true });
    }
    catch (err) {
        console.error(err);
    }
});
exports.default = router;
//# sourceMappingURL=profileRoute.js.map