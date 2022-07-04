"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_common_1 = require("skydapp-common");
const Config_1 = __importDefault(require("./Config"));
const WebSocketClient_1 = __importDefault(require("./WebSocketClient"));
class SigorBot extends skydapp_common_1.EventContainer {
    constructor(api, currentChannel, username, pfp, avatarImage) {
        super();
        this.api = api;
        this.currentChannel = currentChannel;
        this.client = new WebSocketClient_1.default(`wss://${Config_1.default.backendHost}`);
        this.client.on("connect", async () => {
            console.log("connected to server.");
            await this.client.send("enter-channel", currentChannel);
            await this.client.send("bot-login", api, username, pfp, avatarImage);
        });
        this.client.on("disconnect", () => {
            console.log("disconnected from server.");
            setTimeout(() => {
                this.client.reconnect();
            }, 1000);
        });
        this.client.toss(`${this.currentChannel}/createAvatar`, this, "createAvatar");
        this.client.toss(`${this.currentChannel}/removeAvatar`, this, "removeAvatar");
        this.client.toss(`${this.currentChannel}/chat`, this, "chat");
        this.client.toss(`${this.currentChannel}/moveTo`, this, "moveTo");
    }
    get avatarId() {
        return `bot-${this.api}`;
    }
    async chat(message) {
        this.client.send(`${this.currentChannel}/chat`, message);
    }
    async moveTo(x, y) {
        this.client.send(`${this.currentChannel}/moveTo`, x, y);
    }
}
exports.default = SigorBot;
//# sourceMappingURL=SigorBot.js.map