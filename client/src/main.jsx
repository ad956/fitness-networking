import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "@fontsource/lato";
import "./index.css";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import { theme } from "./theme/theme.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);
