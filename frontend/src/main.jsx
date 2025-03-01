import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import HookContextProvider from "./context/HookContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HookContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HookContextProvider>
  </StrictMode>
);
