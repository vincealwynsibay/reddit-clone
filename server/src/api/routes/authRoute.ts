import gravatar from "gravatar";
import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import Profile from "../models/profileModel";
const router = express.Router();

router.post("/register", async (req, res) => {
	const { email, username, password, gender } = req.body;

	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		let newUser: any = new User({
			username,
			email,
			password: hashedPassword,
		});
		newUser = await newUser.save();

		// create profile
		let newProfile: any = new Profile({
			displayName: "",
			banner: "",
			description: "",
			gender,
			avatar: gravatar.url(email, { d: "retro" }),
			socialLinks: [],
		});

		await newProfile.save();

		return res.json({ success: true, user: newUser });
	} catch (err) {
		console.error(err);
	}
});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email: email });

		if (!user) {
			throw new Error("User does not exist");
		}

		const valid = await bcrypt.compare(password, user.password);

		if (!valid) {
			throw new Error("Invalid email or password");
		}

		const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET_KEY!, {
			expiresIn: "2h",
		});
		const bearerToken = `Bearer ${token}`;

		return res.json({
			success: true,
			user,
			token: bearerToken,
		});
	} catch (err) {
		console.error(err);
	}
});

export default router;
