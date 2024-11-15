import React, { useEffect, useState } from "react";
import Head from "next/head";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";

export default function Live() {
	const [liveData, setLiveData] = useState<any>(null);

	useEffect(() => {
		async function fetchData() {
			const response = await fetch("/api/getLive", {
				method: "POST",
			});
			const data = await response.json();
			setLiveData(data);
		}

		fetchData();
	}, []);

	if (!liveData) {
		return <div>Loading...</div>;
	}

	const latestData = liveData[liveData.length - 1];

	return (
		<>
			<Head>
				<title>Live Data</title>
				<link
					rel="icon"
					href="/favicon.ico"
				/>
			</Head>

			<Container
				maxWidth="xl"
				sx={{ mt: 4 }}
			>
				<Grid
					container
					spacing={4}
				>
					<Grid
						item
						xs={12}
						md={6}
					>
						<Card>
							<CardHeader title="Power" />
							<CardContent>
								<p>Voltage: {latestData.volt}</p>
								<p>Current: {latestData.current}</p>
								<p>Active Power: {latestData.ActivePower}</p>
								<p>Power Factor: {latestData.PowerFactor}</p>
							</CardContent>
						</Card>
					</Grid>
					<Grid
						item
						xs={12}
						md={6}
					>
						<Card>
							<CardHeader title="Consumption" />
							<CardContent>
								<p>Energy Consumed: {latestData.EnergyConsumed}</p>
								<p>Air: {latestData.air}</p>
							</CardContent>
						</Card>
					</Grid>
					<Grid
						item
						xs={12}
						md={6}
					>
						<Card>
              
							<CardHeader title="Caps" />
							<CardContent>
								<p>Feed Cap Carre: {latestData.FeedCapCarre}</p>
								<p>Feed Cap Round: {latestData.FeedCapRound}</p>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Container>
		</>
	);
}
