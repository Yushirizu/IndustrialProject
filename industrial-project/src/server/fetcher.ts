import { db } from "./db";
import { NextApiRequest, NextApiResponse } from "next";

const ws: WebSocket = new WebSocket("ws://127.0.0.1:1881/ws/historic");

let receivedData: { [key: string]: number } = {};

export function initWS() {
	ws.addEventListener("open", () => {
		console.log("Websocket ouvert");
	});

	ws.addEventListener("message", (msg) => {
		let data;
		try {
			data = JSON.parse(msg.data);
		} catch (error) {
			console.error("Données reçues ne sont pas un objet JSON:", msg.data);
			return;
		}

		// Ajoutez la donnée reçue au tableau
		receivedData[data.topic] = data.payload;

		// Si toutes les valeurs nécessaires ont été reçues, traitez-les
		const requiredKeys = [
			"volt",
			"air",
			"current",
			"ActivePower",
			"PowerFactor",
			"EC",
			"FCC",
			"FCR",
		];

		if (requiredKeys.every((key) => key in receivedData)) {
			const {
				volt,
				air,
				current,
				ActivePower,
				PowerFactor,
				EC: EnergyConsumed,
				FCC: FeedCapCarre,
				FCR: FeedCapRound,
			} = receivedData;

			// Réinitialisez le tableau pour les prochaines données
			receivedData = {};

			// Insérez les données dans la base de données
			db.live
				.create({
					data: {
						volt: Number(volt),
						air: Number(air),
						current: Number(current),
						ActivePower: Number(ActivePower),
						PowerFactor: Number(PowerFactor),
						EnergyConsumed: Number(EnergyConsumed),
						FeedCapCarre: Number(FeedCapCarre),
						FeedCapRound: Number(FeedCapRound),
					},
				})
				.then(() => console.log("Ajouté"))
				.catch((error) => console.error("Erreur lors de l'ajout:", error));
		}
	});
}
