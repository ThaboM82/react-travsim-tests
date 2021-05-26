import React from "react";
import ReactDOM from "react-dom";

import SignupForm from "./SignupForm";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <SignupForm />
  </React.StrictMode>,
  rootElement
);
