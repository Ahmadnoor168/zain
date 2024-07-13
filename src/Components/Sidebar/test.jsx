import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import "./sidebar.css";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, sidebarDis, language } from "../../Redux/authAction";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sidebarSelect = useSelector((state) => state.authReducer.check);
  const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);
  const lang = useSelector((state) => state.authReducer.lang);
  const { t, i18n } = useTranslation();
  
  // Separate state for each dropdown
  const [invoiceDropdown, setInvoiceDropdown] = useState(false);

  // Initialize isChecked state based on the current language
  const [isChecked, setIsChecked] = useState(lang === 'jp');

  useEffect(() => {
    i18n.changeLanguage(lang);
    setIsChecked(lang === 'jp');
  }, [lang, i18n]);

  const handleSignout = () => {
    dispatch(logoutUser());
  };

  const toggleInvoiceDropdown = () => {
    setInvoiceDropdown(!invoiceDropdown);
    dispatch(sidebarDis(!invoiceDropdown))
  };
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    dispatch(language(lng));
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    event.target.checked ? changeLanguage('jp') : changeLanguage('en');
  };

  const invoiceDropdownStyle = {
    transition: 'transform 0.5s',
    transform: sidebarSelect ? 'translateY(0)' : 'translateY(-10px)',
    height: sidebarSelect ? "auto" : "0px",
    opacity: sidebarSelect ? 1 : 0,
    visibility: sidebarSelect ? 'visible' : 'hidden',
  };

  return (
    <div className='sidebarContainer'>
      <div className='sidebarSection'>
        <p style={{ height: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>LOGO</p>
        <button className={`nav-link ${sidebarSelect ? 'active' : ''}`} onClick={toggleInvoiceDropdown}>
          {t('sideOne')}
        </button>
        <div style={{ height: "auto", overflow: "hidden" }}>
          <div style={invoiceDropdownStyle} className={`dropdown ${sidebarSelect ? 'actives' : 'inactive'}`}>
            <NavLink to="/" className="nav-link">{t('sidetwo')}</NavLink>
            <NavLink to="/menu" className="nav-link">{t('sidethree')}</NavLink>
            <NavLink to="/emailTemplate" className="nav-link">{t('sidefour')}</NavLink>
            <NavLink to="/companyInfo" className="nav-link">{t('sidefive')}</NavLink>
          </div>
        </div>
        <NavLink to="/shipmentDetail" style={{ marginTop: sidebarSelect ? "0px" : "-20px" }} className="nav-link" activeClassName="active">
          {t('sidesix')}
        </NavLink>
      </div>
      <div className='bottomSection'>
        <div className="switch-container">
        <span className="switch-label" data-tg-on="English" data-tg-off="Japanese">
            {isChecked ? "Japanese" : "English"}
          </span>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <div className="toggle-switch-background">
              <div className="toggle-switch-handle"></div>
            </div>
          </label>
     
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
