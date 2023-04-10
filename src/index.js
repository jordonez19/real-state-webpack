import { createRoot } from "react-dom/client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React from "react";

import "./style.css";

import App from "./App.js";

const root = createRoot(document.getElementById("react-container"));
root.render(<App />);
