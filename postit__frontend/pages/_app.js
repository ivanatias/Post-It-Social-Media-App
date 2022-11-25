import React from "react";
import SearchContext from "../searchContext";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import { ErrorBoundary } from "../components";

import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SearchContext>
          <SessionProvider session={session}>
            <ErrorBoundary>
              <Component {...pageProps} />
            </ErrorBoundary>
          </SessionProvider>
          <ToastContainer
            position="bottom-right"
            autoClose={3500}
            hideProgressBar
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </SearchContext>
        <ReactQueryDevtools />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
