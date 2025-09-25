import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Root from "./Root.jsx";
import "./index.css"; // tailwind

const container = document.getElementById("root");
if (!container) {
  // Création défensive du conteneur si absent (exécution tests/jsdom)
  const el = document.createElement("div");
  el.id = "root";
  document.body.appendChild(el);
}
const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </StrictMode>
);