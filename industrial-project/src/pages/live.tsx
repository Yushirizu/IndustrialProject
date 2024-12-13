import React, { useEffect, useState } from "react";
import Head from "next/head";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid2";
import { useSession } from "next-auth/react";
import { Typography } from "@mui/material";
import { set } from "zod";

export default function Live() {
	const { data: session, status } = useSession() as {
		data: { user: { isAdmin: boolean } } | null;
		status: string;
	};
	const [liveData, setLiveData] = useState<any>(null);
	const [error, setError] = useState<string | null>(null);
	const [isAdmin, setIsAdmin] = useState<boolean>(false);

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
			setIsAdmin(false);
		} else {
			setIsAdmin(true);
		}
	}, [status]);

	if (status === "loading" && isAdmin) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	if (!isAdmin) {
		return (
			<Container maxWidth="xl">
				<Card sx={{ mt: 4, p: 4 }}>
					<Typography variant="h4" gutterBottom>
						Please sign in to an admin account to access this page
					</Typography>
				</Card>
			</Container>
		);
	}

	if (!liveData && isAdmin) {
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
								<p>Voltage: {liveData}</p>
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
