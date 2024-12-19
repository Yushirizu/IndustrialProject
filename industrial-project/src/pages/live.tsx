import React, {useEffect, useState} from "react";
import Head from "next/head";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid2";
import {useSession} from "next-auth/react";
import {Box, Typography} from "@mui/material";

export default function Live() {
    const {data: session, status} = useSession() as {
        data: { user: { isAdmin: boolean } } | null; status: string;
    };
    const [liveData, setLiveData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    let receivedData: { [key: string]: number } = {};

    useEffect(() => {
        if (status === "authenticated") {
            if (session?.user.isAdmin) {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
            let ws: WebSocket;

            const connectWebSocket = () => {
                ws = new WebSocket("ws://130.130.130.245:1880/ws/live");

                ws.addEventListener("open", () => {
                    console.log("WebSocket connection established");
                });

                ws.addEventListener("message", (msg) => {
                    try {
                        const data = JSON.parse(msg.data);
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
                    setError("Websocket error: " + err.toString());
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
        return (<div
                style={{
                    display: "flex", justifyContent: "center", alignItems: "center", height: "100vh",
                }}>
                Loading...
            </div>);
    }

    if (status === "unauthenticated" || !isAdmin) {
        return (<Container maxWidth="xl">
                <Card sx={{mt: 4, p: 4, m: 5, borderRadius: 5}}>
                    <Typography variant="h4" gutterBottom>
                        Please sign in to an admin account to access this page
                    </Typography>
                </Card>
            </Container>);
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!liveData) {
        return (<div
                style={{
                    display: "flex", justifyContent: "center", alignItems: "center", height: "100vh",
                }}>
                Loading data...
            </div>);
    }

    return (<>
            <Head>
                <title>Live Data</title>
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
                                p: 2, boxShadow: 3, borderRadius: 5, backgroundColor: "rgba(129, 25, 72, 0.5)",
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
                                p: 2, boxShadow: 3, borderRadius: 5, backgroundColor: "rgba(129, 25, 72, 0.5)",
                            }}>
                            <CardHeader title="Consumption"/>
                            <CardContent>
                                <p>
                                    Energy Consumed:{" "}
                                    {liveData?.EnergyConsumed ? liveData.EnergyConsumed + "Wh" : "N/A"}
                                </p>
                                <p>Air: {liveData?.air ?? "N/A"}</p>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid size={6}>
                        <Card
                            sx={{
                                p: 2, boxShadow: 3, borderRadius: 5, backgroundColor: "rgba(129, 25, 72, 0.5)",
                            }}>
                            <CardHeader title="Caps"/>
                            <CardContent>
                                <p>Feed Cap Square: {liveData?.FeedCapCarre ?? "N/A"}</p>
                                <p>Feed Cap Round: {liveData?.FeedCapRound ?? "N/A"}</p>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>);
}
