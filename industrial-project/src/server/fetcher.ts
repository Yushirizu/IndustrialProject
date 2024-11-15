import { db } from "./db";

const ws: WebSocket = new WebSocket("ws://127.0.0.1:1881/ws/yape");

export function initWS() {
	ws.addEventListener("open", (event) => {
		console.log("Websocket ouvert");
	});

	ws.addEventListener("message", (msg) => {
		console.log(msg.data);
		const data = JSON.parse(msg.data);

		// Vérifiez que toutes les valeurs nécessaires sont présentes
		if (
			data.volt !== undefined &&
			data.air !== undefined &&
			data.current !== undefined &&
			data.ActivePower !== undefined &&
			data.PowerFactor !== undefined &&
			data.EnergyConsumed !== undefined &&
			data.FeedCapCarre !== undefined &&
			data.FeedCapRound !== undefined
		) {
			db.live
				.create({
					data: {
						volt: data.volt,
						air: data.air,
						current: data.current,
						ActivePower: data.ActivePower,
						PowerFactor: data.PowerFactor,
						EnergyConsumed: data.EnergyConsumed,
						FeedCapCarre: data.FeedCapCarre,
						FeedCapRound: data.FeedCapRound,
					},
				})
				.then(() => console.log("Ajouté"))
				.catch((error) => console.error("Erreur lors de l'ajout:", error));
		} else {
			console.error("Données manquantes ou invalides:", data);
		}
	});
}
