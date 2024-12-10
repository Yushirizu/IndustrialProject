import React, { useEffect, useState } from "react";
import Head from "next/head";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { useSession } from "next-auth/react";

export default function Live() {
	const { data: session, status } = useSession() as {
		data: { user: { isAdmin: boolean } } | null;
		status: string;
	};
	const ws: WebSocket = new WebSocket(
		"wss://nodered.helhatechniquecharleroi.xyz/ws/tank"
	);
	const [liveData, setLiveData] = useState<any>(null);

	useEffect(() => {
		ws.addEventListener("open", () => {
			console.log("Websocket ouvert");
		});

		ws.addEventListener("message", (msg) => {
			let data;
			try {
				data = JSON.parse(msg.data);
				setLiveData(data);
			} catch (error) {
				console.error("Données reçues ne sont pas un objet JSON:", msg.data);
				return;
			}
		});
	}, []);

	if (status === "loading") {
		return <div>Loading...</div>;
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
					<Grid item xs={12} md={6}>
						<Card>
							<CardHeader title="Power" />
							<CardContent>
								<p>Voltage: {liveData}</p>
								<p>Current: {liveData.current}</p>
								<p>Active Power: {liveData.ActivePower}</p>
								<p>Power Factor: {liveData.PowerFactor}</p>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} md={6}>
						<Card>
							<CardHeader title="Consumption" />
							<CardContent>
								<p>Energy Consumed: {liveData.EnergyConsumed}</p>
								<p>Air: {liveData.air}</p>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} md={6}>
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
