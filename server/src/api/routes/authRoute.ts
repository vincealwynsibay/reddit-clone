import bcrypt from "bcryptjs";
import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
const router = express.Router();

router.get(
	"/me",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		res.json({ user: req.user });
	}
);

router.post("/register", async (req, res) => {
	const { email, username, password } = req.body;
	console.log(email, username, password);

	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		let newUser = new User({ username, email, password: hashedPassword });
		newUser = await newUser.save();

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
