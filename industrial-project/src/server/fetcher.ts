import { object } from "zod";
import { db } from "./db";

const ws: WebSocket = new WebSocket("ws://127.0.0.1:1881/ws/yape");

export function initWS() {
	ws.addEventListener("open", (event) => {
		console.log("Websocket ouvert");
	});

	ws.addEventListener("message", (msg) => {
		// console.log("Message reçu: " + msg.data);
	});

	ws.addEventListener("error", (event) => {
		console.log("Erreur websocket");
	});
}
