import { useState } from 'react';
import "./email.css";
import Sidebar from '../../Components/Sidebar';
import { Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const EmailTemplate = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const jwtToken = useSelector((state) => state.authReducer.jwtToken);
  const { t } = useTranslation();

  const handleSave = async () => {
    const formattedData = {
      title,
      body
    };
    console.log("formattedData", formattedData);

    try {
      const response = await axios.post('https://invoice-system-gqb8a.ondigitalocean.app/api/add-email-template', formattedData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        },
      });
      console.log('Response:', response.data);
      setSnackbarMessage('Email templates saved successfully.');
      setSnackbarSeverity('success');
    } catch (error) {
      console.error('Error:', error);
      setSnackbarMessage('Failed to save email templates. Please try again.');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <Sidebar />
      <div className='emailContainer'>
        <div className='detail'>
          <p>{t('EmailHead')}</p>
        </div>
        <div className='emailtemplate'>
          <div>
            <label>{t('EmailInOne')}</label>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label>{t('EmailInTwo')}</label>
            <input
              type='text'
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
        </div>
        <button className='saveBtn' onClick={handleSave}>{t('CNBtnTwo')}</button>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default EmailTemplate;
