import Head from "next/head";
import React, { useEffect, useState } from "react";
import {
	Card,
	Container,
	CardHeader,
	Avatar,
	IconButton,
	CardContent,
	Button,
	Typography,
} from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
	const [activity, setactivity] = useState<Array<any>>();

	const { data: session } = useSession();

	return (
		<>
			<Head>
				<title>Tablo d'bor</title>
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
				<Card>
					<CardHeader
						avatar={
							session?.user.image ? (
								<Avatar
									alt={session.user.name || ""}
									src={session.user.image || ""}
								/>
							) : (
								<Avatar>{session?.user.name?.charAt(0)}</Avatar>
							)
						}
						action={
							!session ? (
								<Button
									variant="contained"
									onClick={() => signIn()}
									color="primary"
								>
									Essai login
								</Button>
							) : (
								<Button
									variant="contained"
									onClick={() => signOut()}
									color="primary"
								>
									Essai logout
								</Button>
							)
						}
						title={
							session
								? `Connecté en tant que: ${session.user.name}`
								: "Non connecté"
						}
					/>
					<CardContent>
						<Typography variant="body1">
							{session
								? `Bienvenue, ${session.user.name}!`
								: "Veuillez vous connecter."}
						</Typography>
					</CardContent>
				</Card>
			</Container>
		</>
	);
}
