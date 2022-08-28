"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const router = express_1.default.Router();
router.get("/me", passport_1.default.authenticate("jwt", { session: false }), (req, res) => {
    res.json({ user: req.user });
});
router.post("/register", async (req, res) => {
    const { email, username, password } = req.body;
    console.log(email, username, password);
    try {
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        let newUser = new userModel_1.default({ username, email, password: hashedPassword });
        newUser = await newUser.save();
        return res.json({ success: true, user: newUser });
    }
    catch (err) {
        console.error(err);
    }
});
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel_1.default.findOne({ email: email });
        if (!user) {
            throw new Error("User does not exist");
        }
        const valid = await bcryptjs_1.default.compare(password, user.password);
        if (!valid) {
            throw new Error("Invalid email or password");
        }
        const token = jsonwebtoken_1.default.sign({ sub: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "2h",
        });
        const bearerToken = `Bearer ${token}`;
        return res.json({
            success: true,
            user,
            token: bearerToken,
        });
    }
    catch (err) {
        console.error(err);
    }
});
exports.default = router;
//# sourceMappingURL=authRoute.js.map