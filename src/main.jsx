import App from "./App.jsx";
import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./chakraTheme.js";
import { notify } from "./services/toastService.js";
import { t as translate } from "./helper/translate.ts";

import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found. Vite template expects a div#root in index.html.");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

// Expose translation helper globally
// Allows calling t("key", {param: "value"}) anywhere without import
globalThis.t = translate;
globalThis.notify = notify;
