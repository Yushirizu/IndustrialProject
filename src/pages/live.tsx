import React, {useEffect, useState} from "react";
import Head from "next/head";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid2";
import {useSession} from "next-auth/react";
import {Box, Typography} from "@mui/material";

type LiveData = {
    volt: number;
    air: number;
    current: number;
    ActivePower: number;
    PowerFactor: number;
    EC: number;
    FCC: number;
    FCR: number;
};

export default function Live() {
    const {data: session, status} = useSession();
    const [liveData, setLiveData] = useState<LiveData | null>(null);
    let receivedData: Record<string, number> = {};

    useEffect(() => {
        if (status === "authenticated") {
            let ws: WebSocket;

            const connectWebSocket = () => {
                ws = new WebSocket("ws://130.130.130.245:1880/ws/live");

                ws.addEventListener("open", () => {
                    console.log("WebSocket connection established");
                });

                ws.addEventListener("message", (msg) => {
                    const data = JSON.parse(msg.data as string) as { topic: string; payload: number };
                    receivedData[data.topic] = data.payload;
                    const requiredKeys = ["volt", "air", "current", "ActivePower", "PowerFactor", "EC", "FCC", "FCR",];

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
                        } = receivedData as LiveData;

                        receivedData = {};

                        setLiveData({
                            volt,
                            air,
                            current,
                            ActivePower,
                            PowerFactor,
                            EC: EnergyConsumed,
                            FCC: FeedCapCarre,
                            FCR: FeedCapRound,
                        });
                    }
                });

                ws.addEventListener("error", (err) => {
                    console.error("WebSocket error:", err);
                });

                ws.addEventListener("close", () => {
                    console.log("WebSocket connection closed");
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
        return (<div
            style={{
                display: "flex", justifyContent: "center", alignItems: "center", height: "100vh",
            }}>
            Loading...
        </div>);
    }

    if (status === "unauthenticated" || !session?.user.isAdmin) {
        return (<Container maxWidth="xl">
            <Card sx={{mt: 4, p: 4, m: 5, borderRadius: 5}}>
                <Typography variant="h4" gutterBottom>
                    Please sign in to an admin account to access this page
                </Typography>
            </Card>
        </Container>);
    }

    return (<>
        <Head>
            <title>Live Data</title>
            <meta name="description" content="Projet industriel"/>
            <link rel="icon" href="/favicon.ico"/>
        </Head>

        <Container maxWidth="xl" sx={{mt: 4}}>
            <Box mb={4} ml={1}>
                <Typography variant="h3" gutterBottom>
                    Live Data Monitoring
                </Typography>
                <Typography variant="body1">
                    This page displays real-time data from the industrial system.
                </Typography>
            </Box>
            <Grid container spacing={4}>
                <Grid size={6}>
                    <Card
                        sx={{
                            p: 2, boxShadow: "0 0px 5px 0 rgba(41, 120, 215, 0.4)", borderRadius: 5,
                        }}>
                        <CardHeader title="Power"/>
                        <CardContent>
                            <p>
                                Voltage:{" "}
                                {liveData?.volt ? liveData.volt.toFixed(2) + "V" : "N/A"}
                            </p>
                            <p>
                                Current:{" "}
                                {liveData?.current ? liveData.current.toFixed(2) + "A" : "N/A"}
                            </p>
                            <p>
                                Active Power:{" "}
                                {liveData?.ActivePower ? liveData.ActivePower.toFixed(2) + "W" : "N/A"}
                            </p>
                            <p>
                                Power Factor:{" "}
                                {liveData?.PowerFactor ? liveData.PowerFactor.toFixed(2) : "N/A"}
                            </p>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={6}>
                    <Card
                        sx={{
                            p: 2, boxShadow: "0 0px 5px 0 rgba(41, 120, 215, 0.4)", borderRadius: 5,
                        }}>
                        <CardHeader title="Consumption"/>
                        <CardContent>
                            <p>
                                Energy Consumed: {liveData?.EC ? liveData.EC + "Wh" : "N/A"}
                            </p>
                            <p>Air: {liveData?.air ?? "N/A"}</p>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={6}>
                    <Card
                        sx={{
                            p: 2, boxShadow: "0 0px 5px 0 rgba(41, 120, 215, 0.4)", borderRadius: 5,
                        }}>
                        <CardHeader title="Caps"/>
                        <CardContent>
                            <p>Feed Cap Square: {liveData?.FCC ?? "N/A"}</p>
                            <p>Feed Cap Round: {liveData?.FCR ?? "N/A"}</p>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    </>);
}
