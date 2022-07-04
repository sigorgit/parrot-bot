import { EventContainer } from "skydapp-common";
import Character2D from "./Character2D";
export default class SigorBot extends EventContainer {
    private api;
    private currentChannel;
    private client;
    get avatarId(): string;
    constructor(api: string, currentChannel: string, username: string, pfp: string, avatarImage: Character2D);
    chat(message: string): Promise<void>;
    moveTo(x: number, y: number): Promise<void>;
}
//# sourceMappingURL=SigorBot.d.ts.map