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
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.get("/ping", (_req, res) => {
    res.json("pong");
});
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something Broke" });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`[server] Server listening on port ${PORT}`);
});
//# sourceMappingURL=index.js.map