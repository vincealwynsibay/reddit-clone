import passport from "passport";
import express from "express";

const router = express.Router();

router.get(
	"/me",
	passport.authenticate("/", { session: false }),
	(_req, res) => {
		return res.json();
	}
);

export default router;
