import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ButtonAppBar from "../appBar";
import { Box, Paper, Typography } from "@mui/material";

import styled, { keyframes } from "styled-components";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// Animation RGB pour paper
const rgbAnimation = keyframes`
  0% { background-color: rgb(255, 0, 0); }  // Couleur de départ
  50% { background-color: rgb(0, 255, 98); } // Transition vers une autre couleur
  100% { background-color: rgb(76, 0, 255); } // Retour à la couleur initiale
`;

// Styled Paper avec l'animation RGB
const AnimatedPaper = styled(Paper)`
  animation: ${rgbAnimation} 5s infinite alternate;
`;

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#e495b9",
    },
    secondary: {
      main: "#811948",
    },
    background: {
      default: "#1a0911",
      paper: "rgba(12, 17, 23, 0.5)", // Couleur par défaut (fallback)
    },
    info: {
      main: "#e22379",
    },
    text: {
      primary: "#f5e7ed",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: "radial-gradient(circle, rgb(2, 27, 52), rgb(5, 7, 10))",
        },
      },
    },
  },
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <ButtonAppBar />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
};

export default MyApp;
