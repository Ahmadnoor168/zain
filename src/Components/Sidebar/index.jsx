import React from 'react'
import {NavLink} from "react-router-dom"
import "./sidebar.css"
const Sidebar = () => {
  return (
    <div className='sidebarContainer'>
    <div className='sidebarSection'>
      <p style={{ height: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>LOGO</p>

      <NavLink to="/"  className="nav-link" activeClassName="active">
      Invoice System
          </NavLink>
          <NavLink to="/client"  className="nav-link" activeClassName="active">
          Client
          </NavLink>
          <NavLink to="/menu"  className="nav-link" activeClassName="active">
          Menu
          </NavLink>
          <NavLink to="/emailTemplate"  className="nav-link" activeClassName="active">
          Email Template
          </NavLink>
          <NavLink to="/companyInfo"  className="nav-link" activeClassName="active">
          Company Information
          </NavLink>
          {/* <NavLink to="/shipmentDetail"  className="nav-link" activeClassName="active">
          Shipment System
          </NavLink> */}


          <div className="nav-link">
          Logout
          </div>



      </div>
      </div>
  )
}

export default Sidebar