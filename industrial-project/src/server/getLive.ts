import { db } from "./db";
import { NextApiRequest, NextApiResponse } from "next";

const ws: WebSocket = new WebSocket("ws://127.0.0.1:1881/ws/live");

export default async function getHistoric(
	req: NextApiRequest,
	res: NextApiResponse
) {
	ws.addEventListener("open", () => {
		console.log("Websocket ouvert");
	});

	ws.addEventListener("message", (msg) => {
		let data;
		try {
			data = JSON.parse(msg.data);
			res.status(200).json(data);
		} catch (error) {
			console.error("Données reçues ne sont pas un objet JSON:", msg.data);
			return;
		}
	});
}
