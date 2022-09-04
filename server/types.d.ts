import { ObjectId } from "mongoose";
declare namespace Express {
	export interface User {
		_id: ObjectId;
		username: string;
		email: string;
		password: string;
	}
}
