import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const container = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// The build ships prerendered HTML to hydrate; the dev server does not.
if (container.firstElementChild) hydrateRoot(container, app);
else createRoot(container).render(app);
