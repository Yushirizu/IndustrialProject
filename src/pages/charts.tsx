import * as React from "react";
import {useEffect, useState} from "react";
import Head from "next/head";
import Container from "@mui/material/Container";
import {BarChart, LineChart} from "@mui/x-charts";
import {useSession} from "next-auth/react";
import {Box, Card, CardContent, CardHeader, Typography} from "@mui/material";
import {axisClasses} from "@mui/x-charts/ChartsAxis";

export default function Home() {
    const {data: session, status} = useSession();
    const [lineChartData, setlineChartData] = useState<Array<{ timestamp: string; ec: number }>>([]);
    const [barchartData, setbarChartData] = useState<Array<{ timestamp: string; fcc: number }>>([]);
    type DatasetItem = {
        timestamp: string; EnergyConsumed: number; FeedCapCarre: number; FeedCapRound: number;
    };
    useEffect(() => {
        const fetchData = async () => {
            await fetch("/api/getCharts", {method: "POST"})
                .then((response) => response.json())
                .then((res: DatasetItem[]) => {
                    const dataset = res.map((item) => ({
                        timestamp: item.timestamp,
                        ec: item.EnergyConsumed,
                        fcc: item.FeedCapCarre,
                        fcr: item.FeedCapRound,
                    }));
                    setlineChartData(dataset.slice(-15));
                    setbarChartData(dataset.slice(-5));
                });
        };

        void fetchData();

        const intervalId = setInterval(() => {
            void fetchData();
        }, 10000);

        return () => clearInterval(intervalId);
    }, []);

    if (status === "unauthenticated" || session?.user.isAdmin === false) {
        return (<Container maxWidth="xl">
            <Card sx={{mt: 4, p: 4, borderRadius: 5}}>
                <Typography variant="h4" gutterBottom>
                    Please sign in to an admin account to access this page
                </Typography>
            </Card>
        </Container>);
    }

    return (<>
        <Head>
            <title>Charts</title>
            <meta name="description" content="Projet industriel"/>
            <link rel="icon" href="/favicon.ico"/>
        </Head>

        <Container maxWidth="xl" sx={{mt: 4, pb: 2}}>
            <Box mb={4}>
                <Typography variant="h3" gutterBottom>
                    Charts
                </Typography>
                <Typography variant="body1">
                    This page displays two charts representing the industrial
                    system&#39;s data.
                </Typography>
            </Box>
            <Card
                sx={{
                    p: 2, boxShadow: "0 0px 5px 0 rgba(41, 120, 215, 0.4)", m: 5, borderRadius: 5,
                }}>
                <CardHeader title="Total energy consumed"/>
                <CardContent>
                    <Box display="flex" justifyContent="center">
                        <LineChart
                            xAxis={[{
                                scaleType: "band",
                                dataKey: "timestamp",
                                valueFormatter: (value: string) => new Date(value).toLocaleTimeString(),
                            },]}
                            yAxis={[{
                                colorMap: {
                                    type: "continuous", min: -10, max: 10, color: ["#811948", "#e22379"],
                                }, label: "EC", labelStyle: {
                                    transform: "translateX(-50px)",
                                },
                            },]}
                            series={[{dataKey: "ec"}]}
                            dataset={lineChartData}
                            width={1200}
                            height={400}
                            margin={{left: 100, right: 30, top: 30, bottom: 30}}
                            grid={{vertical: true, horizontal: true}}
                        />
                    </Box>
                </CardContent>
            </Card>

            <Card
                sx={{
                    p: 2, boxShadow: "0 0px 5px 0 rgba(41, 120, 215, 0.4)", m: 5, borderRadius: 5,
                }}>
                <CardHeader title="Number of caps"/>
                <CardContent>
                    <Box display="flex" justifyContent="center">
                        <BarChart
                            dataset={barchartData}
                            xAxis={[{
                                scaleType: "band",
                                dataKey: "timestamp",
                                valueFormatter: (value: string) => new Date(value).toLocaleTimeString(),
                            },]}
                            series={[{
                                dataKey: "fcc", label: "Feed Cap Carre", color: "#811948",
                            }, {
                                dataKey: "fcr", label: "Feed Cap Round", color: "#e22379",
                            },]}
                            height={300}
                            grid={{horizontal: true}}
                            sx={{
                                [`& .${axisClasses.left} .${axisClasses.label}`]: {
                                    transform: "translateX(-10px)",
                                },
                            }}
                        />
                    </Box>
                </CardContent>
            </Card>
        </Container>
    </>);
}
