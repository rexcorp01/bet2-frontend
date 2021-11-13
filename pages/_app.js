import { useEffect } from "react";
import PropTypes from "prop-types";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../src/theme/theme";
import "../styles/globals.css";
import DateAdapter from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <div suppressHydrationWarning>
      <Head>
        <title>Fotbets - The Football Betting App</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {typeof window === "undefined" ? null : (
              <Component {...pageProps} />
            )}
          </ThemeProvider>
        </StyledEngineProvider>
      </LocalizationProvider>
    </div>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
