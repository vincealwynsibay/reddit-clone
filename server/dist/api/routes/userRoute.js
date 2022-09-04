"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const passport_1 = __importDefault(require("passport"));
const express_1 = __importDefault(require("express"));
const userModel_1 = __importDefault(require("../models/userModel"));
const router = express_1.default.Router();
router.get("/me", passport_1.default.authenticate("jwt", { session: false }), (req, res) => {
    res.json({ user: req.user });
});
router.put("/me", passport_1.default.authenticate("jwt", { session: false }), async (req, res) => {
    const { newEmail, email, password, confirmPassword } = req.body;
    try {
        if (password !== confirmPassword) {
            throw new Error("Password and Confirm Password must be the same");
        }
        let user = await userModel_1.default.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }
        const valid = await bcryptjs_1.default.compare(password, user.password);
        if (!valid) {
            throw new Error("Invalid Password");
        }
        user.email = newEmail;
        user = await user.save();
        return res.json({ user });
    }
    catch (err) {
        console.error(err);
    }
});
exports.default = router;
//# sourceMappingURL=userRoute.js.map