import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ButtonAppBar from "../appBar";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

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
      paper: "rgba(12, 17, 23, 0.5)",
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
        html: {
          height: "100%",
          margin: 0,
          padding: 0,
        },
        body: {
          height: "100%",
          minHeight: "100%",
          margin: 0,
          padding: 0,
          background:
            "radial-gradient(circle at top, rgb(2, 27, 52), rgb(5, 7, 10))",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          overflowX: "hidden",
        },
        "#__next": {
          height: "100%",
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
