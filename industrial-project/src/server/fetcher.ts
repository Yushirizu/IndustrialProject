import {db} from "./db";

const ws: WebSocket = new WebSocket("ws://130.130.130.245:1880/ws/live");

let receivedData: Record<string, number> = {};

export function initWS() {
    ws.addEventListener("open", () => {
        console.log("Websocket ouvert");
    });

    ws.addEventListener("message", (msg: MessageEvent) => {
        let data: { topic: string; payload: number };

        try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-argument
            data = JSON.parse(msg.data);
        } catch (error) {
            console.error("Données reçues ne sont pas un objet JSON:", msg.data);
            return;
        }

        if (typeof data.topic === "string" && typeof data.payload === "number") {
            receivedData[data.topic] = data.payload;
        }

        const requiredKeys = ["volt", "air", "current", "ActivePower", "PowerFactor", "EC", "FCC", "FCR"];

        if (requiredKeys.every((key) => key in receivedData)) {
            const {
                volt, air, current, ActivePower, PowerFactor, EC: EnergyConsumed, FCC: FeedCapCarre, FCR: FeedCapRound,
            } = receivedData;

            // Réinitialisez le tableau pour les prochaines données
            receivedData = {};

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
                .catch((error: unknown) => console.error("Erreur lors de l'ajout:", error));
        }
    });
}