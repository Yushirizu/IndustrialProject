import { NextApiRequest, NextApiResponse } from "next";

const ws: WebSocket = new WebSocket(
	"wss://nodered.helhatechniquecharleroi.xyz/ws/tank"
);

export default async function getLive(
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
