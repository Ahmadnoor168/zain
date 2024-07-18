import  { useState } from 'react';
import "./email.css";
import Sidebar from '../../Components/Sidebar';
import { Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';



const EmailTemplate = () => {
  const [templates, setTemplates] = useState([{ id: 1, title: '', body: '' }]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const jwtToken = useSelector((state) => state.authReducer.jwtToken);
  const {t }=useTranslation()

  
  const handleClick = () => {
    const newTemplate = { id: templates.length + 1, title: '', body: '' };
    setTemplates([...templates, newTemplate]);
  };

  const handleInputChange = (id, field, value) => {
    setTemplates(templates.map(template =>
      template.id === id ? { ...template, [field]: value } : template
    ));
  };

  const handleSave = async () => {
    // Check if both title and body are not blank
    const invalidTemplates = templates.filter(template => !template.title.trim() || !template.body.trim());
    if (invalidTemplates.length > 0) {
      setSnackbarMessage('Please fill out both title and body for all templates.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await axios.post('https://invoice-system-gqb8a.ondigitalocean.app/api/add-email-template', templates, {
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
        <button className='addClint' onClick={handleClick}>{t('EmailBtn')}</button>

        {templates.map(template => (
          <div key={template.id} className='emailtemplate'>
            <div>
              <label>{t('EmailInOne')}</label>
              <input
                type='text'
                value={template.title}
                onChange={(e) => handleInputChange(template.id, 'title', e.target.value)}
              />
            </div>
            <div>
              <label>{t('EmailInTwo')}</label>
              <input
                type='text'
                value={template.body}
                onChange={(e) => handleInputChange(template.id, 'body', e.target.value)}
              />
            </div>
          </div>
        ))}
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
