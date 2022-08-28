"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
if (process.env.NODE_ENV === "production") {
    mongoose_1.default.connect(process.env.MONGO_URI_PROD);
    mongoose_1.default.connection.on("connected", () => {
        console.log("[server] Database Connected");
    });
}
else {
    mongoose_1.default.connect(process.env.MONGO_URI_DEV);
    mongoose_1.default.connection.on("connected", () => {
        console.log("[server] Database Connected");
    });
}
//# sourceMappingURL=db.js.map