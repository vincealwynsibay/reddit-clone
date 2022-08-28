import express from "express";
import authRoute from "./authRoute";
import userRoute from "./userRoute";

const router = express.Router();

router.use("/api/auth", authRoute);
router.use("/api/users", userRoute);

export default router;
