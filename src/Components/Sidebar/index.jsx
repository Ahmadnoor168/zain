import {NavLink} from "react-router-dom"
import "./sidebar.css"
import { useDispatch, useSelector } from 'react-redux'
import {logoutUser} from "../../Redux/authAction"

const Sidebar = () => {
const dispatch = useDispatch()

  const handlesignout = () => {
    dispatch(logoutUser());
  };
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );

    console.log("isAuthenticated",isAuthenticated)
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



          <button
                onClick={handlesignout}
                className="nav-link" style={{background:"transparent", cursor:"pointer"}}
              >
                Sign Out
              </button>


      </div>
      </div>
  )
}

export default Sidebar