import React from "react";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store/store";
import { createRoot } from 'react-dom/client';
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3001'
// axios.defaults.baseURL = 'https://back-three-psi.vercel.app/'
//axios.defaults.baseURL = 'https://piapi-production-992a.up.railway.app/'



const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
);
