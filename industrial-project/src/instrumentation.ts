import { initWS } from "./server/fetcher";

export function register() {
	console.log("Démarrage WS");
	initWS();
}
