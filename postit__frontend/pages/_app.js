import React from "react";
import { AppContext } from "../context/context";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AppContext>
      <Component {...pageProps} />
    </AppContext>
  );
}

export default MyApp;
