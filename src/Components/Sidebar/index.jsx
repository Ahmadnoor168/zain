import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import ReceiptIcon from '@mui/icons-material/Receipt';
import Person4Icon from '@mui/icons-material/Person4';
import WidgetsIcon from '@mui/icons-material/Widgets';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import BusinessIcon from '@mui/icons-material/Business';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import LogoutIcon from '@mui/icons-material/Logout';
import Switch from '@mui/material/Switch';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, sidebarDis, language } from "../../Redux/authAction";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export default function PermanentDrawer() {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const sidebarSelect = useSelector((state) => state.authReducer.check);
  const lang = useSelector((state) => state.authReducer.lang);

  const handleInvoiceClick = (event) => {
    event.stopPropagation();
    if (event.target.tagName === 'SPAN') {
      dispatch(sidebarDis(!sidebarSelect));
    }
  };

  const handleSignout = () => {
    dispatch(logoutUser());
    dispatch(sidebarDis(!sidebarSelect));
  };

  const [isChecked, setIsChecked] = useState(lang === 'jp');

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    event.target.checked ? changeLanguage('jp') : changeLanguage('en');
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    dispatch(language(lng));
  };

  useEffect(() => {
    i18n.changeLanguage(lang);
    setIsChecked(lang === 'jp');
  }, [lang, i18n]);

  const DrawerList = (
    <Box sx={{
      width: 300,
      bgcolor: "#189ce4",
      height: "100%",
      color: "white",
      position: 'relative',
      overflow: 'auto',
    }} role="presentation">
      <Avatar src="/path/to/your/image.jpg" alt="Avatar" style={{ width: 60, height: 60, margin: "20px auto" }} />

      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleInvoiceClick}>
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary={t('sideOne')} />
            {sidebarSelect ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>

        <Collapse in={sidebarSelect} timeout={0} unmountOnExit>
          <List component="div" disablePadding>
            <ListItem key="client" disablePadding>
              <ListItemButton
                component={NavLink}
                to="/"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <Person4Icon />
                </ListItemIcon>
                <ListItemText primary={t('sidetwo')} />
              </ListItemButton>
            </ListItem>
            <ListItem key="menu" disablePadding>
              <ListItemButton
                component={NavLink}
                to="/menu"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <WidgetsIcon />
                </ListItemIcon>
                <ListItemText primary={t('sidethree')} />
              </ListItemButton>
            </ListItem>
            <ListItem key="emailtemplate" disablePadding>
              <ListItemButton
                component={NavLink}
                to="/emailTemplate"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <ContactMailIcon />
                </ListItemIcon>
                <ListItemText primary={t('sidefour')} />
              </ListItemButton>
            </ListItem>
            <ListItem key="companyinfo" disablePadding>
              <ListItemButton
                component={NavLink}
                to="/companyInfo"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <BusinessIcon />
                </ListItemIcon>
                <ListItemText primary={t('sidefive')} />
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>

        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to="/shipmentDetail"
          >
            <ListItemIcon>
              <AirportShuttleIcon />
            </ListItemIcon>
            <ListItemText primary={t('sidesix')} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            component="button"
            onClick={handleSignout}
            style={{ background: "transparent", cursor: "pointer", width: "100%", textAlign: "left" }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={t('sideseven')} />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider />

      <div style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        padding: "10px 16px",
        borderTop: "1px solid rgba(255, 255, 255, 0.12)",
        background: "#189ce4",
        width: "100%",
        textAlign: "right",
      }}>
        <span className="switch-label" style={{ color: "white", marginRight: 10 }}>
          {isChecked ? "Japanese" : "English"}
        </span>
        <Switch
          checked={isChecked}
          onChange={handleCheckboxChange}
          color="primary"
          inputProps={{ 'aria-label': 'language switch' }}
        />
      </div>
    </Box>
  );

  return (
    <div>
      <Drawer open variant="permanent">
        {DrawerList}
      </Drawer>
    </div>
  );
}
