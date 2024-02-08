import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import Home from "./pages/Home/Home";
import Support from "./pages/Support/Support";
import Questions from "./pages/Questions/Questions";
import Promo from "./pages/Promo/Promo";
import About from "./pages/About/About";
import reportWebVitals from "./reportWebVitals";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./i18n";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/support",
    element: <Support />,
  },
  {
    path: "/contact-us",
    element: <Questions />,
  },
  {
    path: "/promo",
    element: <Promo />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/support/terms",
    element: <Support tab="terms" />,
  },
  {
    path: "/support/faq",
    element: <Support tab="faq" />,
  },
  {
    path: "/support/policy",
    element: <Support tab="policy" />,
  },
  {
    path: "/support/disclaimer",
    element: <Support tab="disclaimer" />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
