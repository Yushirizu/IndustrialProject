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
	const [liveData, setLiveData] = useState<any>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (status === "authenticated") {
			async function fetchData() {
				try {
					const response = await fetch("/api/getLive", {
						method: "POST",
					});
					if (!response.ok) {
						throw new Error("Failed to fetch data");
					}
					const data = await response.json();
					setLiveData(data);
				} catch (error) {
					setError("You are not connected to the server.");
				}
			}

			fetchData();
		} else if (session?.user.isAdmin === false) {
			setError("Vous n'êtes pas autorisé à accéder à cette page.");
		} else {
			setError("Please sign in to view this page.");
		}
	}, [status]);

	if (status === "loading") {
		return <div>Loading...</div>;
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
								<p>Voltage: {liveData.volt}</p>
								<p>Current: {liveData.current}</p>
								<p>Active Power: {liveData.ActivePower}</p>
								<p>Power Factor: {liveData.PowerFactor}</p>
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
