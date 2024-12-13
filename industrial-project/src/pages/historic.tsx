import * as React from "react";
import Head from "next/head";
import Grid from "@mui/material/Grid2";
import { DataGrid } from "@mui/x-data-grid";
import { tableLive } from "../strucTables";
import {
  Card,
  Container,
  CardHeader,
  CardContent,
  Typography,
} from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession() as {
    data: { user: { isAdmin: boolean } } | null;
    status: string;
  };
  const [live, setLive] = useState<Array<any>>();
  useEffect(() => {
    fetch("/api/getHistoric", { method: "POST" })
      .then((response) => response.json())
      .then((res) => {
        setLive(res);
      });
  }, []);

  if (status === "unauthenticated" || session?.user.isAdmin === false) {
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

  return (
    <>
      <Head>
        <title>PROJET INDUSTRIEL</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Card>
              <CardHeader title="Relais" />
              <CardContent>
                <DataGrid columns={tableLive} hideFooter rows={live} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
