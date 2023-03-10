import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { AuthHoc } from "../hoc/AuthHoc";
import store from "../store";
import "../styles/globals.css";
import { theme } from "../theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AuthHoc>
          <Component {...pageProps} />
        </AuthHoc>
      </ThemeProvider>
    </Provider>
  );
}
