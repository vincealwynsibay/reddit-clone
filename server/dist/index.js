"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const passport_1 = __importDefault(require("passport"));
const index_1 = __importDefault(require("./api/routes/index"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "http://localhost:3000", credentials: true }));
require("./config/db");
const passport_2 = require("./config/passport");
(0, passport_2.applyPassportStrategy)(passport_1.default);
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.get("/ping", (_req, res) => {
    res.json("pong");
});
app.get("/protected", passport_1.default.authenticate("jwt", { session: false }), (_req, res) => {
    res.json({ message: "authenticated" });
});
app.use(index_1.default);
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something Broke" });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`[server] Server listening on port ${PORT}`);
});
//# sourceMappingURL=index.js.map