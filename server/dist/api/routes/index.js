"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoute_1 = __importDefault(require("./authRoute"));
const userRoute_1 = __importDefault(require("./userRoute"));
const profileRoute_1 = __importDefault(require("./profileRoute"));
const router = express_1.default.Router();
router.use("/api/auth", authRoute_1.default);
router.use("/api/users", userRoute_1.default);
router.use("/api/profile", profileRoute_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map