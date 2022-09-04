import { IProfile } from "./../models/profileModel";
import passport from "passport";
import { multerUpload } from "./../../config/multer";
import { uploadImage } from "./../lib/uploadImage";
import express from "express";
import gravatar from "gravatar";
import Profile from "../models/profileModel";
import User from "../models/userModel";

const router = express.Router();

router.get("/", (req, res) => {
	return res.json("nice");
});

router.post("/upload", multerUpload.single("image"), async (req, res) => {
	try {
		if (req.file) {
			const image = await uploadImage(req);
			return res.json({
				message:
					"Your image has been uploded successfully to cloudinary",
				data: { image },
			});
		}
	} catch (err) {
		console.error(err);
	}
});

/* change default avatar */
router.put(
	"/me/avatar",
	passport.authenticate("jwt", { session: false }),
	multerUpload.single("file"),
	async (req, res) => {
		try {
			if (req.file) {
				const image = await uploadImage(req);

				// get user email
				let user = (req.user as any).email;

				// find user
				user = await User.findOne({ email: user });

				// find profile
				let profile: any = await Profile.findOne({ _id: user._id });

				profile.avatar = image;
				profile = await profile.save();

				return res.json({ ok: true, profile });
			}
			return res.json({ ok: false });
		} catch (err) {
			console.error(err);
		}
	}
);
/* change banner */
router.put(
	"/me/banner",
	passport.authenticate("jwt", { session: false }),
	multerUpload.single("file"),
	async (req, res) => {
		try {
			if (req.file) {
				const image = await uploadImage(req);

				// get user id
				let user = (req.user as any)._id;

				// find profile
				let profile: any = await Profile.findOne({ _id: user });

				profile.banner = image;
				profile = await profile.save();

				return res.json({ ok: true, profile });
			}
			return res.json({ ok: false });
		} catch (err) {
			console.error(err);
		}
	}
);

/* add/edit description */
router.put(
	"/me/desc",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		try {
			const { description } = req.body;

			// get user id
			let user = (req.user as any)._id;

			// get profile
			let profile = await Profile.findById(user);

			if (profile === null) {
				throw new Error("Profile not found");
			}

			profile.description = description;
			await profile.save();
			res.json({ ok: true });
		} catch (err) {
			console.error(err);
		}
	}
);

/* change gender */
router.put(
	"/me/desc",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		try {
			const { gender } = req.body;

			// get user id
			let user = (req.user as any)._id;

			// get profile
			let profile = await Profile.findById(user);

			if (profile === null) {
				throw new Error("Profile not found");
			}

			profile.gender = gender;
			await profile.save();
			res.json({ ok: true });
		} catch (err) {
			console.error(err);
		}
	}
);

/* edit social links*/
router.put(
	"/me/desc",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		try {
			const { twitter, instagram, facebook, spotify, tiktok, discord } =
				req.body;

			// get user id
			let user = (req.user as any)._id;

			const socialLinks = {
				twitter,
				instagram,
				facebook,
				spotify,
				tiktok,
				discord,
			};

			// get profile
			Profile.findByIdAndUpdate(user, {
				$set: { socialLinks },
			});

			res.json({ ok: true });
		} catch (err) {
			console.error(err);
		}
	}
);

export default router;
