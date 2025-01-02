import { db } from "~/server/db";

interface LiveData {
	volt: number;
	air: number;
	current: number;
	ActivePower: number;
	PowerFactor: number;
	EC: number;
	FCC: number;
	FCR: number;
}

let receivedData: LiveData = {
	volt: 0,
	air: 0,
	current: 0,
	ActivePower: 0,
	PowerFactor: 0,
	EC: 0,
	FCC: 0,
	FCR: 0,
};

// WebSocket connection setup
const ws = new WebSocket("ws://127.0.0.1:1881/ws/live");

ws.addEventListener("open", () => {
	console.log("WebSocket connection established");
});

ws.addEventListener("message", (msg) => {
	try {
		const data: { topic: string; payload: number } = JSON.parse(msg.data);
		if (typeof data.topic === "string" && typeof data.payload === "number") {
			receivedData[data.topic as keyof LiveData] = data.payload;
		}

		const requiredKeys: (keyof LiveData)[] = [
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
			receivedData = {
				volt: 0,
				air: 0,
				current: 0,
				ActivePower: 0,
				PowerFactor: 0,
				EC: 0,
				FCC: 0,
				FCR: 0,
			};

			// Insérez les données dans la base de données
			db.historicalData
				.create({
					data: {
						timestamp: new Date(),
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
				.catch((error: unknown) =>
					console.error("Erreur lors de l'ajout:", error)
				);
		}
	} catch (error) {
		console.error("Données reçues ne sont pas un objet JSON:", msg.data);
	}
});

ws.addEventListener("error", (err) => {
	console.error("WebSocket error:", err);
});

ws.addEventListener("close", () => {
	console.log("WebSocket connection closed");
});
