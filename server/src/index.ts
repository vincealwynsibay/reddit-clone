import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

app.get("/ping", (_req, res) => {
	res.json("pong");
});

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
	console.error(err.stack);
	res.status(500).json({ error: "Something Broke" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`[server] Server listening on port ${PORT}`);
});
