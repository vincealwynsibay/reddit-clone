"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyPassportStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const userModel_1 = __importDefault(require("../api/models/userModel"));
const applyPassportStrategy = (passport) => {
    passport.use(new passport_jwt_1.Strategy({
        jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET_KEY,
    }, async function (jwt_payload, done) {
        try {
            const user = await userModel_1.default.findOne({ _id: jwt_payload.sub });
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        }
        catch (err) {
            return done(err, false);
        }
    }));
};
exports.applyPassportStrategy = applyPassportStrategy;
//# sourceMappingURL=passport.js.map