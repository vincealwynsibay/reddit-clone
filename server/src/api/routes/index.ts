import express from "express";
import authRoute from "./authRoute";
import userRoute from "./userRoute";
import profileRoute from "./profileRoute";

const router = express.Router();

router.use("/api/auth", authRoute);
router.use("/api/users", userRoute);
router.use("/api/profile", profileRoute);

export default router;
