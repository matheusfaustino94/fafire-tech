import React from "react";
import ReactDOM from "react-dom";
import Router from "./router";
import { ToastContainer } from "react-toastify";
import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <React.StrictMode>
    <ToastContainer theme="dark" position="bottom-left" />
    <Router />
  </React.StrictMode>,
  document.getElementById("root")
);
