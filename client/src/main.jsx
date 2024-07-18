import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider as ReduxProvider } from "react-redux";
import store from "./app/store.js";
import { NextUIProvider } from "@nextui-org/react";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary, ErrorFallback } from "@components";
const queryClient = new QueryClient();

// initialize Firebase
import "./components/Firebase";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <NextUIProvider>
              <App />
            </NextUIProvider>
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </ReduxProvider>
  </React.StrictMode>
);
