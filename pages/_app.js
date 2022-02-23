import { useEffect, useState } from "react";
import { StoreProvider } from "../utils/AppContext";
import "../styles/globals.css";
import { SnackbarProvider } from "notistack";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { SWRConfig } from "swr";
import fetcher from "../swr/config/fetcher";

const MyApp = ({ Component, pageProps }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    setMounted(true);
  }, []);

  if (mounted) {
    return (
      <SWRConfig value={{ fetcher }}>
        <SnackbarProvider
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <StoreProvider>
            <PayPalScriptProvider deferLoading={true}>
              <Component {...pageProps} />
            </PayPalScriptProvider>
          </StoreProvider>
        </SnackbarProvider>
      </SWRConfig>
    );
  } else return null;
};

export default MyApp;
