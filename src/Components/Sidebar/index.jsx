import { useState } from 'react';
import { NavLink } from "react-router-dom";
import "./sidebar.css";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from "../../Redux/authAction";
import TranslateComponent from './transalte';
import { useTranslation } from 'react-i18next';





const Sidebar = () => {
  const dispatch = useDispatch();
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleSignout = () => {
    dispatch(logoutUser());
  };

  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );

  const dropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? dropdown : dropdown);
  };

  const handleMainMenuItemClick = () => {
    setActiveDropdown(null);
  };

  const {t, i18n }=useTranslation()
  return (
    <div className='sidebarContainer'>
      <div className='sidebarSection'>
        <p style={{ height: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>LOGO</p>

        {/* <div className='nav-link' >
         
        </div> */}

        <NavLink to="/" className="nav-link" activeClassName="active" onClick={() => dropdown('invoiceSystem')}>
        {t('sideOne')}
            </NavLink>


            
        {activeDropdown === 'invoiceSystem' && (
          <div className='dropdown'>
            <NavLink to="/" className="nav-link" activeClassName="active">
            {t('sidetwo')}
            </NavLink>
            <NavLink to="/menu" className="nav-link" activeClassName="active">
            {t('sidethree')}
            </NavLink>
            <NavLink to="/emailTemplate" className="nav-link" activeClassName="active">
            {t('sidefour')}
            </NavLink>
            <NavLink to="/companyInfo" className="nav-link" activeClassName="active">
            {t('sidefive')}
            </NavLink>
          </div>
        )}

        <NavLink to="/shipmentDetail" className="nav-link" activeClassName="active" onClick={handleMainMenuItemClick}>
        {t('sidesix')}
        </NavLink>
        <div style={{position:"absolute", top:"20px"}}>
        <TranslateComponent/>
        </div>
        <button
          onClick={handleSignout}
          className="nav-link"
          style={{ background: "transparent", cursor: "pointer" }}
        >
          {t('sideseven')}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
