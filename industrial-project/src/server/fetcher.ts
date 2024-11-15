import { object } from "zod";
import { db } from "./db";

const ws: WebSocket = new WebSocket("")

export function initWS() {
    ws.addEventListener('open', (event) => {
        console.log('Websocket ouvert');
    })

    ws.addEventListener('message', (msg) => {
        console.log('Message reçu: ' + msg.data);
    })

    ws.addEventListener('error', (event) => {
        console.log('Erreur websocket');
    })

}