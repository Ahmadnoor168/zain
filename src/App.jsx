import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from './Pages/Home';
import Client from "./Pages/Client";
import CompanyInfo from "./Pages/CompanyInfo";
import EmailTemplate from "./Pages/EmailTemplate";
import Menu from "./Pages/Menu";
import ShipmentDetail from "./Pages/ShipmentDetail";
import Bill from './Pages/Bill';
import SignIn from './Pages/AuthPages/signIn';
import Signup from './Pages/AuthPages/signup';
import ErrorMessage from "./ErrorMessage";
import Layout from "./Pages/Layout";

// Router for unauthenticated users
const routerAuth = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorMessage />,
    children: [
      {
        path: "",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
]);

// Router for authenticated users
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorMessage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "client",
        element: <Client />,
      },
      {
        path: "companyInfo",
        element: <CompanyInfo />,
      },
      {
        path: "emailTemplate",
        element: <EmailTemplate />,
      },
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "shipmentDetail",
        element: <ShipmentDetail />,
      },
      {
        path: "bill",
        element: <Bill />,
      },
    ],
  },
]);

const App = () => {
  const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);

  return <RouterProvider router={isAuthenticated ? router : routerAuth} />;
};

export default App;
