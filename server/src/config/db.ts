import mongoose from "mongoose";

if (process.env.NODE_ENV === "production") {
	mongoose.connect(process.env.MONGO_URI_PROD!);

	mongoose.connection.on("connected", () => {
		console.log("[server] Database Connected");
	});
} else {
	mongoose.connect(process.env.MONGO_URI_DEV!);

	mongoose.connection.on("connected", () => {
		console.log("[server] Database Connected");
	});
}
