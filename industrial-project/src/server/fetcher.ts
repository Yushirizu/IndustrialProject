import { object } from "zod";
import { db } from "./db";

const ws: WebSocket = new WebSocket("ws:")

export function initWS() {
    ws.addEventListener('open', (event) => {
        console.log('Websocket ouvert');
    })

    ws.addEventListener('error', (event) => {
        console.log('Erreur websocket');
    })

}