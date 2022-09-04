import { Schema, model, Types } from "mongoose";

export interface IProfile {
	user_id: Types.ObjectId;
	displayName: string;
	avatar: string;
	banner: string;
	description: string;
	gender: string;
	socialLinks: Array<string>;
}

const profileSchema = new Schema({
	user_id: {
		type: Types.ObjectId,
	},
	displayName: {
		type: String,
	},
	avatar: {
		type: String,
	},
	banner: {
		type: String,
		default:
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKIAAAB6CAMAAAALQXhrAAAAA1BMVEX/fwCxRWwOAAAAKklEQVR4nO3BgQAAAADDoPlTH+AKVQEAAAAAAAAAAAAAAAAAAAAAAADwBk2uAAFf7LYFAAAAAElFTkSuQmCC",
	},
	description: {
		type: String,
	},
	gender: {
		type: String,
		required: true,
	},
	socialLinks: {
		twitter: {
			type: String,
		},
		instagram: {
			type: String,
		},
		facebook: {
			type: String,
		},
		spotify: {
			type: String,
		},
		tiktok: {
			type: String,
		},
		discord: {
			type: String,
		},
	},
});

export default model("Profile", profileSchema);
