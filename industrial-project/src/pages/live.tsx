import React, { useEffect, useState } from "react";
import Head from "next/head";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid2";
import { useSession } from "next-auth/react";

export default function Live() {
	const { data: session, status } = useSession() as {
		data: { user: { isAdmin: boolean } } | null;
		status: string;
	};
	const [liveData, setLiveData] = useState<any>(null);
	const [error, setError] = useState<string | null>(null);
	const [isAdmin, setIsAdmin] = useState<boolean>(false);
	let receivedData: { [key: string]: number } = {};

	useEffect(() => {
		if (status === "authenticated") {
			let ws: WebSocket;

			const connectWebSocket = () => {
				ws = new WebSocket("ws://127.0.0.1:1881/ws/live");

				ws.addEventListener("open", () => {
					console.log("WebSocket connection established");
				});

				ws.addEventListener("message", (msg) => {
					try {
						const data = JSON.parse(msg.data);
						receivedData[data.topic] = data.payload;
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

							// Mettez à jour l'état avec les nouvelles données
							setLiveData({
								volt,
								air,
								current,
								ActivePower,
								PowerFactor,
								EnergyConsumed,
								FeedCapCarre,
								FeedCapRound,
							});
						}
					} catch (error) {
						console.error("Invalid JSON data received:", msg.data);
					}
				});

				ws.addEventListener("error", (err) => {
					console.error("WebSocket error:", err);
					setError(err.toString());
				});

				ws.addEventListener("close", () => {
					console.log("WebSocket connection closed");
					// Reconnecter après une fermeture
					setTimeout(connectWebSocket, 1000);
				});
			};

			connectWebSocket();

			return () => {
				if (ws) {
					ws.close();
				}
			};
		}
	}, [status]);

	if (status === "loading") {
		return <div>Loading...</div>;
	}

	if (status === "unauthenticated") {
		return <div>Please sign in to view this page.</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	if (!liveData) {
		return <div>Loading data...</div>;
	}

	return (
		<>
			<Head>
				<title>Live Data</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Container maxWidth="xl" sx={{ mt: 4 }}>
				<Grid container spacing={4}>
					<Grid size={6}>
						<Card>
							<CardHeader title="Power" />
							<CardContent>
								<p>Voltage: {liveData.volt}</p>
								<p>Current: {liveData.current}</p>
								<p>Active Power: {liveData.ActivePower}</p>
								<p>Power Factor: {liveData.PowerFactor}</p>
							</CardContent>
						</Card>
					</Grid>
					<Grid size={6}>
						<Card>
							<CardHeader title="Consumption" />
							<CardContent>
								<p>Energy Consumed: {liveData.EnergyConsumed}</p>
								<p>Air: {liveData.air}</p>
							</CardContent>
						</Card>
					</Grid>
					<Grid size={6}>
						<Card>
							<CardHeader title="Caps" />
							<CardContent>
								<p>Feed Cap Carre: {liveData.FeedCapCarre}</p>
								<p>Feed Cap Round: {liveData.FeedCapRound}</p>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Container>
		</>
	);
}
