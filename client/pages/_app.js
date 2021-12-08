import "../styles/globals.css";
import { useEffect } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import axios from "axios";
import { RouterScrollProvider } from "@moxy/next-router-scroll";
import theme from "../theme";
import Footer from "../src/components/layout/Footer";
import Navbar from "../src/components/layout/NavBar";
import "animate.css";

axios.defaults.baseURL =
  "http://elice-kdt-2nd-team1.koreacentral.cloudapp.azure.com:5000/";

export default function MyApp(props) {
  const { Component, pageProps } = props;
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>AllOFArt</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <RouterScrollProvider>
          <CssBaseline />
          <Navbar />
          <Component {...pageProps} />
          <Footer />
          <style jsx global>
            {`
              html,
              body {
                background: #f7c73b !important;
                padding: 0 !important;
                margin: 0 !important;
              }
            `}
          </style>
        </RouterScrollProvider>
      </ThemeProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
