import React from "react";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "../node_modules/bootstrap/scss/bootstrap.scss";
import "./styles/styles.scss";
import ReactDOM from "react-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-bootstrap";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
