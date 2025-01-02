import { db } from "./db";

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

const ws: WebSocket = new WebSocket("ws://130.130.130.245:1880/ws/live");

export function initWS() {
	ws.addEventListener("open", () => {
		console.log("WebSocket connection established");
	});

	ws.addEventListener("message", (msg) => {
		try {
			let data: { topic: string; payload: number };
			data = JSON.parse(msg.data);
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

				db.historicalData.create({
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
				});
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
}
