"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const profileSchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.Types.ObjectId,
    },
    displayName: {
        type: String,
    },
    avatar: {
        type: String,
    },
    banner: {
        type: String,
        default: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKIAAAB6CAMAAAALQXhrAAAAA1BMVEX/fwCxRWwOAAAAKklEQVR4nO3BgQAAAADDoPlTH+AKVQEAAAAAAAAAAAAAAAAAAAAAAADwBk2uAAFf7LYFAAAAAElFTkSuQmCC",
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
exports.default = (0, mongoose_1.model)("Profile", profileSchema);
//# sourceMappingURL=profileModel.js.map