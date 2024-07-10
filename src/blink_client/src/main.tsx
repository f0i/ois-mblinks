import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ClaimPage from "./pages/ClaimPage.tsx";
import SwapPage from "./pages/SwapPage.tsx";

const router = createBrowserRouter([
  {
    path: "/claim",
    element: <ClaimPage />,
  },
  {
    path: "/swap",
    element: <SwapPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
