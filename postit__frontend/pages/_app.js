import React from "react";
import { AppContext } from "../context/context";
import { ToastContainer } from "react-toastify";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AppContext>
      <Component {...pageProps} />
      <ToastContainer
        position="bottom-right"
        autoClose={3500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </AppContext>
  );
}

export default MyApp;
