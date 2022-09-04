import bcrypt from "bcryptjs";
import passport from "passport";
import express from "express";
import User from "../models/userModel";

const router = express.Router();

router.get(
	"/me",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		res.json({ user: req.user });
	}
);

router.put(
	"/me",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		const { newEmail, email, password, confirmPassword } = req.body;

		try {
			if (password !== confirmPassword) {
				throw new Error(
					"Password and Confirm Password must be the same"
				);
			}

			let user = await User.findOne({ email });

			if (!user) {
				throw new Error("User not found");
			}

			const valid = await bcrypt.compare(password, user.password);

			if (!valid) {
				throw new Error("Invalid Password");
			}

			user.email = newEmail;
			user = await user.save();
			return res.json({ user });
		} catch (err) {
			console.error(err);
		}
	}
);

export default router;
