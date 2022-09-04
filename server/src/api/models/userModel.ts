import { Schema, model, ObjectId } from "mongoose";

const userSchema = new Schema(
	{
		_id: { type: Schema.Types.ObjectId },
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export default model("User", userSchema);
