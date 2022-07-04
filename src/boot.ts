import "dotenv/config";
import Character2D from "./Character2D";
import SigorBot from "./SigorBot";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export default async function boot() {

    const bot = new SigorBot(process.env.API_KEY!, "yard", "앵무새 봇", "https://storage.googleapis.com/sigor/characters/parrot-bot-pfp.jpeg", {
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

    bot.on("createAvatar", (info: {
        avatarId: string,
        username: string,
        x: number,
        y: number,
        toX: number | undefined,
        toY: number | undefined,
        avatarImage: Character2D,
    }) => {
        if (info.avatarId !== bot.avatarId) {
            bot.chat(`${info.username} 안녕?`);
        }
    });

    bot.on("removeAvatar", (avatarId: string, username: string) => {
        if (avatarId !== bot.avatarId) {
            bot.chat(`${username} 갔네...`);
        }
    });

    bot.on("chat", (who: string, message: string) => {
        setTimeout(() => {
            bot.chat(message);
        }, 2000);
    });

    bot.on("moveTo", (who: string, x: number, y: number) => {
        setTimeout(() => {
            bot.moveTo(x + Math.random() * 40 - 20, y + Math.random() * 40 - 20);
        }, 2000);
    });
}