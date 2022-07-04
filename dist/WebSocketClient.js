"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_common_1 = require("skydapp-common");
const ws_1 = __importDefault(require("ws"));
class WebSocketClient extends skydapp_common_1.EventContainer {
    constructor(url) {
        super();
        this.url = url;
        this.sendKey = 0;
        this.reconnect();
    }
    reconnect() {
        this.webSocket = new ws_1.default(this.url);
        this.webSocket.onopen = () => this.fireEvent("connect");
        this.webSocket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            this.fireEvent(data.method, ...data.params);
        };
        this.webSocket.onclose = () => this.fireEvent("disconnect");
    }
    async send(method, ...params) {
        this.webSocket.send(JSON.stringify({ method, params, __send_key: this.sendKey }));
        const callbackName = `__callback_${this.sendKey}`;
        const errorkName = `__error_${this.sendKey}`;
        this.sendKey += 1;
        return new Promise((resolve, reject) => {
            this.on(callbackName, resolve);
            this.on(errorkName, reject);
        });
    }
}
exports.default = WebSocketClient;
//# sourceMappingURL=WebSocketClient.js.map