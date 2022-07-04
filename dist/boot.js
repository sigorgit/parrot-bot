"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const SigorBot_1 = __importDefault(require("./SigorBot"));
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
async function boot() {
    const bot = new SigorBot_1.default(process.env.API_KEY, "yard", "앵무새 봇", "https://storage.googleapis.com/sigor/characters/parrot-bot-pfp.jpeg", {
        set_image: "https://storage.googleapis.com/sigor/characters/parrot-bot.png",
        stand: {
            top: {
                crop_x: 0,
                crop_y: 32 * 4,
                crop_width: 32,
                crop_height: 32,
                center_x: 16,
                center_y: 29,
            },
            bottom: {
                crop_x: 32 * 3,
                crop_y: 32 * 2,
                crop_width: 32,
                crop_height: 32,
                center_x: 16,
                center_y: 29,
            },
            right: {
                crop_x: 32 * 3,
                crop_y: 32 * 3,
                crop_width: 32,
                crop_height: 32,
                center_x: 16,
                center_y: 29,
            },
        },
        walk: {
            top: {
                crop_x: 0,
                crop_y: 32 * 4,
                crop_width: 32 * 8,
                crop_height: 32,
                frame_width: 32,
                frame_height: 32,
                center_x: 16,
                center_y: 29,
                fps: 10,
            },
            bottom: {
                crop_x: 0,
                crop_y: 32 * 2,
                crop_width: 32 * 8,
                crop_height: 32,
                frame_width: 32,
                frame_height: 32,
                center_x: 16,
                center_y: 29,
                fps: 10,
            },
            right: {
                crop_x: 0,
                crop_y: 32 * 3,
                crop_width: 32 * 8,
                crop_height: 32,
                frame_width: 32,
                frame_height: 32,
                center_x: 16,
                center_y: 29,
                fps: 10,
            },
        },
    });
    bot.on("createAvatar", (info) => {
        if (info.avatarId !== bot.avatarId) {
            bot.chat(`${info.username} 안녕?`);
        }
    });
    bot.on("removeAvatar", (avatarId, username) => {
        if (avatarId !== bot.avatarId) {
            bot.chat(`${username} 갔네...`);
        }
    });
    bot.on("chat", (who, message) => {
        setTimeout(() => {
            bot.chat(message);
        }, 2000);
    });
    bot.on("moveTo", (who, x, y) => {
        setTimeout(() => {
            bot.moveTo(x + Math.random() * 40 - 20, y + Math.random() * 40 - 20);
        }, 2000);
    });
}
exports.default = boot;
//# sourceMappingURL=boot.js.map