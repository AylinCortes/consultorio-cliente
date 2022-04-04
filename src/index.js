import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import "./index.css";
import "./sb-admin-2.min.css";

import { BrowserRouter } from "react-router-dom";

import { Router } from "./components/router/Router";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
