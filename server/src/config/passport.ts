import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "../api/models/userModel";

export const applyPassportStrategy = (passport: any) => {
	passport.use(
		new JwtStrategy(
			{
				jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
				secretOrKey: process.env.JWT_SECRET_KEY!,
			},
			async function (jwt_payload: any, done: any) {
				try {
					const user = await User.findOne({ _id: jwt_payload.sub });
					if (!user) {
						return done(null, false);
					}

					return done(null, user);
				} catch (err) {
					return done(err, false);
				}
			}
		)
	);
};
