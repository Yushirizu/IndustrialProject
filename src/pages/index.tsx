import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Projet industriel" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4, pb: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography
            variant="h1"
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(to right, #30CFD0 0%, #330867 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Projet Industriel
          </Typography>
        </Box>
        <Card
          sx={{
            p: 2,
            boxShadow: "0 0px 5px 0 rgba(41, 120, 215, 0.4)",
            m: 5,
            borderRadius: 5,
          }}
        >
          <CardHeader
            avatar={
              session?.user.image ? (
                <Avatar
                  alt={session.user.name ?? ""}
                  src={session.user.image || ""}
                />
              ) : (
                <Avatar>{session?.user.name?.charAt(0)}</Avatar>
              )
            }
            title={
              session
                ? `Connecté en tant que ${session.user.name}`
                : "Non connecté"
            }
          />
          <CardContent>
            <Typography variant="body1">
              {session?.user.isAdmin
                ? "Vous êtes admin"
                : "Vous n'êtes pas admin"}
            </Typography>
            <Box mt={2}>
              {session ? (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => signOut()}
                >
                  Déconnexion
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => signIn()}
                >
                  Connexion
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>

        <Card
          sx={{
            p: 2,
            boxShadow: "0 0px 5px 0 rgba(41, 120, 215, 0.4)",
            m: 5,
            borderRadius: 5,
          }}
        >
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
              <Image
                src="/images/miniusine4_405.jpg"
                alt="SIF405"
                width={400}
                height={300}
                style={{
                  float: "left",
                  marginRight: "20px",
                  borderRadius: 25,
                  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.4)",
                }}
              />
              <Box>
                <Typography
                  variant="h5"
                  gutterBottom
                  m={2}
                  fontWeight={"bold"}
                  sx={{
                    background:
                      "linear-gradient(to right, #30CFD0 0%, #330867 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Présentation de la mini-usine
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "14pt" }}>
                  La miniusine 4.0 est un système industriel qui permet de
                  produire des commandes de récipients rempli de billes de
                  différentes couleurs. On peut y choisir la forme du récipient,
                  la couleur ainsi que la quantité des billes souhaitées. Le
                  système est composé de 10 zones, chacunes traitant différents
                  aspects.
                </Typography>
                <Typography
                  variant="h5"
                  gutterBottom
                  m={2}
                  fontWeight={"bold"}
                  sx={{
                    background:
                      "linear-gradient(to right, #30CFD0 0%, #330867 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Le projet
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "14pt" }}>
                  Dans le cadre du projet industriel, il nous a été demandé de
                  récupérer de manière sécurisée les données d&apos;un automate
                  de la zone 3 de la mini-usine 4. Pour cela, un Ewon, étant un
                  pare-feu industriel, a été utilisé et configuré pour permettre
                  la récupération sé- curisée des données via un tunnel VPN. Ces
                  données, provenant de l&apos;automate utilisant le protocole
                  OPC-UA, sont ensuite transmises à Node-RED, qui agit comme un
                  client OPC-UA, et redirigées vers un WebSocket.
                  <br /><br />
                  Par la suite,
                  ces données doivent être affichées sur un site web créé à
                  l&apos;aide de la stack T3-App. L&apos;accès à ces données est
                  limité aux utilisateurs ayant le statut d&apos;administrateur,
                  nécessitant une authentification, mise en place avec
                  Next-Auth.js, via Discord.
                  <br /><br />
                  Enfin, une visualisation des
                  données a été réalisée sur un Meta Quest 3 à l&apos;aide de
                  Unity, en exploitant la réalité mixte.
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
