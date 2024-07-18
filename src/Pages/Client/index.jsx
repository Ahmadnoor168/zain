import React, { useEffect, useState, useRef } from 'react'
import Sidebar from ".././../Components/Sidebar"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./client.css"
import { FiPlusCircle } from "react-icons/fi";
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Client = () => {

  const { t } = useTranslation()
  const jwtToken = useSelector((state) => state.authReducer.jwtToken);
  const [lastEmailTemplate, setLastEmailTemplate] = useState(null);



  let clintData = [
    {
      name: "January",
    }
  ];
  const [selectedDate, setSelectedDate] = React.useState('');
  const { id, email } = useParams();
  console.log("emailAddress", email)
  const handleDateChange = (event) => {
    const selectedMonth = event.target.value.slice(5, 7);
    const selectedYear = event.target.value.slice(0, 4);

    setSelectedDate(`${selectedYear}-${selectedMonth}`);
  };

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    console.log(files);
  };


  const handleTextButtonClick = () => {
    if (lastEmailTemplate) {
      const randomEmail = generateRandomEmail(); // You can replace this with actual email data if needed
      const subject = encodeURIComponent(lastEmailTemplate.title || '');
      const body = encodeURIComponent(lastEmailTemplate.body || '');
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${randomEmail}&su=${subject}&body=${body}`;
      window.open(gmailUrl, '_blank');
    } else {
      console.error('Last email template is not available');
    }
  };


  const generateRandomEmail = () => {
    return `${email}`;
  };



  const fetchAllEmailTemp = async () => {
    try {
      const response = await axios.get('https://invoice-system-gqb8a.ondigitalocean.app/api/get-all-email-templates', {
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
        },
      });
      if (response.status === 200) {
        const emailTemplates = response.data;
        if (Array.isArray(emailTemplates) && emailTemplates.length > 0) {
          const lastEmailTemplate = emailTemplates[emailTemplates.length - 1];
          console.log('Last Email Template:', lastEmailTemplate);
          setLastEmailTemplate(lastEmailTemplate);
        } else {
          console.error('No email templates found');
        }
      } else {
        console.error('Failed to fetch email templates');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchAllEmailTemp();
  }, [])



  return (
    <>
      <Sidebar />


      <div className='clientContainer'>




        <div className='detail'>
          <p>{t('cliDet')}</p>
        </div>

        <input
          type="month"
          id="date"
          value={selectedDate}
          onChange={handleDateChange}
          className='selectButton'
        />




        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align='center' style={{ width: "25%", fontSize: "22px", fontWeight: 600 }}>{t('cliOne')}</TableCell>
                <TableCell align='center' style={{ width: "25%", fontSize: "22px", fontWeight: 600 }}>{t('cliTwo')}</TableCell>
                <TableCell align='center' style={{ idth: "50%", fontSize: "22px", fontWeight: 600 }}>{t('cliThree')}</TableCell>
              </TableRow>
            </TableHead>


            <TableBody>
              {clintData.map((row, index) => (



                <TableRow key={index} className='table'>
                  <TableCell align='center' component="th" scope="row">
                    {row.name}
                  </TableCell>


                  <TableCell align='center'>

                    <div className="App">
                      <button className='addButton' onClick={handleButtonClick}>
                        Add <FiPlusCircle className='addBtnIcon' />
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                      />
                    </div>
                  </TableCell>


                  <TableCell sx={{ display: "flex", justifyContent: "center", gap: "8px" }}>
                    <NavLink to={`/createInvoice/${id}`} className='invoiceBtn'>Create Invoice Note</NavLink>
                    <button onClick={handleTextButtonClick} className='invoiceBtn'>
                      Send Invoice
                    </button>
                  </TableCell>
                </TableRow>



              ))}
            </TableBody>
          </Table>
        </TableContainer>


      </div>
    </>
  )
}

export default Client