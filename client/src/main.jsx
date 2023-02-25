import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "normalize.css";
import "./main.css";
import { AppProvider } from "./context/appContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AppProvider>
    <App />
  </AppProvider>
  // </React.StrictMode>
);
