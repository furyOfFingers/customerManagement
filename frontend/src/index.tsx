import React from "react";
import { createRoot } from "react-dom/client";

import App from "components/App";
import "./i18n";

const container = document.getElementById("index");
const root = createRoot(container as HTMLElement);
root.render(<App />);
