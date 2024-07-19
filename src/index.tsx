import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HistoryContextProvider } from "./history";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <HistoryContextProvider>
      <BrowserRouter basename="/client-info-rendering">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="v4"element={<App />} />
          <Route path="v3"element={<App />} />
          <Route path="v2"element={<App />} />
          <Route path="v1"element={<App />} />
        </Routes>
      </BrowserRouter>
    </HistoryContextProvider>
  </React.StrictMode>
);
