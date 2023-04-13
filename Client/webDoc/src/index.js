import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/routes";
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <DarkModeContextProvider>
    <RouterProvider router={router}/>
      <App />
    </DarkModeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
