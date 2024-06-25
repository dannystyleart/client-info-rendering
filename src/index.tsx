import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HistoryContextProvider } from "./history";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <HistoryContextProvider>
      <App />
    </HistoryContextProvider>
  </React.StrictMode>
);
