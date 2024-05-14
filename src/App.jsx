import React from 'react'
import {
    createBrowserRouter,
  } from "react-router-dom";
  import Home from './Pages/Home';
import Client from "./Pages/Client"
import CompanyInfo from "./Pages/CompanyInfo"
import EmailTemplate from "./Pages/EmailTemplate"
import Menu  from "./Pages/Menu"
import ShipmentDetail  from "./Pages/ShipmentDetail"
import Bill from './Pages/Bill';


const App = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },{
    path: "/client",
    element: <Client />,
  },
  {
    path: "/companyInfo",
    element: <CompanyInfo />,
  },{
    path: "/emailTemplate",
    element: <EmailTemplate />,
  },{
    path: "/menu",
    element: <Menu />,
  },{
    path: "/shipmentDetail",
    element: <ShipmentDetail />,
  },{
    path: "/bill",
    element: <Bill />,
  }
  
]
);
 
export default App