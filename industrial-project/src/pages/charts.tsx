import * as React from "react";
import { useState, useEffect } from "react";
import Head from "next/head";
import Container from "@mui/material/Container";
import { LineChart } from "@mui/x-charts";

export default function Home() {
	const [chartData, setChartData] = useState<Array<{ id: number; ec: number }>>(
		[]
	);

	useEffect(() => {
		fetch("/api/getCharts", { method: "POST" })
			.then((response) => response.json())
			.then((res) => {
				const dataset = res.map((item: any) => ({
					id: item.id,
					ec: item.EnergyConsumed,
				}));
				setChartData(dataset);
			});
	}, []);

	return (
		<>
			<Head>
				<title>PROJET INDUSTRIEL</title>
				<meta
					name="description"
					content="Generated by create-t3-app"
				/>
				<link
					rel="icon"
					href="/favicon.ico"
				/>
			</Head>

			<Container
				maxWidth="xl"
				sx={{ mt: 4 }}
			>
				<LineChart
					xAxis={[{ dataKey: "id" }]}
					series={[{ dataKey: "ec" }]}
					dataset={chartData}
					width={1200}
					height={400}
					margin={{ left: 100, right: 30, top: 30, bottom: 30 }}
					grid={{ vertical: true, horizontal: true }}
				/>
			</Container>
		</>
	);
}
