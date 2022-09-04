import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import passport from "passport";
import routes from "./api/routes/index";

const app = express();
// middlewares
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

// configs
import "./config/db";
import "./config/cloudinary";
import { applyPassportStrategy } from "./config/passport";
import { cloudinaryConfig } from "./config/cloudinary";
applyPassportStrategy(passport);

app.use("*", cloudinaryConfig);
app.use(routes);

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
	console.error(err.stack);
	res.status(500).json({ error: "Something Broke" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`[server] Server listening on port ${PORT}`);
});
