import * as React from "react";
import {useEffect, useState} from "react";
import Head from "next/head";
import Grid from "@mui/material/Grid2";
import {DataGrid} from "@mui/x-data-grid";
import {tableLive} from "~/strucTables";
import {Box, Card, CardContent, CardHeader, Container, Typography,} from "@mui/material";
import {useSession} from "next-auth/react";

export default function Home() {
    const {data: session, status} = useSession();
    type HistoricData = {
        id: number;
        timestamp: string;
        volt: number;
        air: number;
        current: number;
        EnergyConsumed: number;
        FeedCapCarre: number;
        FeedCapRound: number;
    };

    const [historicData, setHistoricData] = useState<Array<HistoricData>>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/getHistoric", {method: "POST"});
                const res: HistoricData[] = await response.json() as HistoricData[];
                setHistoricData(res);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        void fetchData();
    }, []);

    if (status === "unauthenticated" || session?.user.isAdmin === false) {
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
                <title>Historic</title>
                <meta name="description" content="Projet industriel"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Container maxWidth="xl" sx={{mt: 4}}>
                <Box mb={4} ml={5}>
                    <Typography variant="h3" gutterBottom>
                        Historic Data
                    </Typography>
                    <Typography variant="body1">
                        This page displays historic data from the industrial system.
                    </Typography>
                </Box>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <Card
                            sx={{
                                mt: 4, p: 4, m: 5, borderRadius: 5, boxShadow: "0 0px 5px 0 rgba(41, 120, 215, 0.4)",
                            }}>
                            <CardHeader title="Relais"/>
                            <CardContent>
                                <DataGrid
                                    columns={tableLive}
                                    rows={historicData}
                                    initialState={{
                                        pagination: {
                                            paginationModel: {
                                                pageSize: 15,
                                            },
                                        },
                                    }}
                                    pageSizeOptions={[15]}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>);
}
