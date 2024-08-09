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
import Managemenu from "./Pages/Admin/Manage Menu/ManageMenu.tsx";
import ManageUsers from "./Pages/Admin/Manage Users/ManageUsers.tsx";
import Inventory from "./Pages/Admin/Inventory/Inventory.tsx";
import MenuPage from "./Pages/Menu/MenuPage.tsx";
import FoodDetails from "./Pages/FoodDetails/FoodDetails.tsx";
import ProfilePage from "./Pages/Profile/Profile.tsx";

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
    path: "/admin/menu",
    element: <Managemenu />,
  },
  {
    path: "/admin/users",
    element: <ManageUsers />,
  },
  {
    path: "/admin/Inventory",
    element: <Inventory />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/profile",
    element: <ProfilePage/>,
  },
  {
    path: "/menu",
    element: <MenuPage />,
  },
  {
    path: "/details",
    element: <FoodDetails />,
  },
  {
    path: "/",
    element: <Login />,
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
