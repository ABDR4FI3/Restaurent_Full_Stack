import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Auth/Login/Login.tsx";
import Register from "./Pages/Auth/Register/Register.tsx";
import HomePage from "./Pages/Home/HomeScreen.tsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    // * defaut patth should be home page
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
