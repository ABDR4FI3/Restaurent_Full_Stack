import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Auth/Login/Login.tsx";
import Register from "./Pages/Auth/Register/Register.tsx";
import HomePage from "./Pages/Home/HomeScreen.tsx";
import Dashboard from "./Pages/Admin/Dashboard/Dashboard.tsx";
import { Provider } from "react-redux";
import store from "./store/index.ts";
import RecentOrders from "./Pages/Admin/Recent Orders/RecentOrders.tsx";

const router = createBrowserRouter([

  {
    path: "/admin/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/admin/orders",
    element: <RecentOrders />,
  },

  {
    path: "/home",
    element: <HomePage />,
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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
