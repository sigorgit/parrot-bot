import { EventContainer } from "skydapp-common";
import Character2D from "./Character2D";
import Config from "./Config";
import WebSocketClient from "./WebSocketClient";

export default class SigorBot extends EventContainer {

    private client: WebSocketClient;

    public get avatarId() {
        return `bot-${this.api}`;
    }

    constructor(private api: string, private currentChannel: string, username: string, pfp: string, avatarImage: Character2D) {
        super();
        this.client = new WebSocketClient(`wss://${Config.backendHost}`);

        this.client.on("connect", async () => {
            console.log("connected to server.");
            await this.client.send("enter-channel", currentChannel);
            await this.client.send("bot-login", api, username, pfp, avatarImage);
        });

        this.client.on("disconnect", () => {
            console.log("disconnected from server.");
            setTimeout(() => {
                // 접속이 끊어지면 자동으로 재접속
                this.client.reconnect();
            }, 1000);
        });

        this.client.toss(`${this.currentChannel}/createAvatar`, this, "createAvatar");
        this.client.toss(`${this.currentChannel}/removeAvatar`, this, "removeAvatar");
        this.client.toss(`${this.currentChannel}/chat`, this, "chat");
        this.client.toss(`${this.currentChannel}/moveTo`, this, "moveTo");
    }

    public async chat(message: string) {
        this.client.send(`${this.currentChannel}/chat`, message);
    }

    public async moveTo(x: number, y: number) {
        this.client.send(`${this.currentChannel}/moveTo`, x, y);
    }
}
