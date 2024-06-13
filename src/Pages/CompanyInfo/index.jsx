import { useState,useEffect } from 'react'
import "./info.css"
import Sidebar from "../../Components/Sidebar"
import { AiOutlinePlusCircle } from "react-icons/ai";
import axios from 'axios';
import { useSelector } from 'react-redux';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Hidden } from '@mui/material';
import { useTranslation } from 'react-i18next';

const CompanyInfo = () => {

  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const jwtToken = useSelector((state) => state.authReducer.jwtToken);
  const {t, i18n }=useTranslation()

  const [transferDestination, setTransferDestination] = useState('');
  const [name, setName] = useState('');
  const [branchNumber, setBranchNumber] = useState('');
  const [branchName, setBranchName] = useState('');
  const [accountType, setAccountType] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [companyDetails, setCompanyDetails] = useState([]);


  const handleSave = async () => {
    console.log('Company Name:', companyName);
    console.log('Address:', address);
    console.log('Email Address:', emailAddress);

    if (!companyName || !address || !emailAddress) {
      alert('Please fill in all fields');
      return;
    }

    const data = {
      companyName,
      address,
      emailAddress,
    };

    try {
      const response = await axios.post('https://invoice-system-gqb8a.ondigitalocean.app/api/add-company', data, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      });

      if (response.status === 200 || response.status === 201) {
        alert('Company data saved successfully!');
        setCompanyName('');
        setAddress('');
        setEmailAddress('');
        setSnackbarMessage('Company Information saved successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        fetchCompanyDetails()
      } else {
        alert('Failed to save company data. Please try again.');
      }
    } catch (error) {
      console.error('Error saving company data:', error);
      alert('An error occurred while saving company data. Please try again.');
    }
  };







  const handleSaveBankDetail = async () => {
    if (!transferDestination || !name || !branchNumber || !branchName || !accountType || !accountNumber) {
        setSnackbarMessage('Please fill in all fields');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
        return;
    }

    const data = {
        transferDestination,
        name,
        branchNumber,
        branchName,
        accountType,
        accountNumber,
    };

    try {
        const response = await axios.post('https://invoice-system-gqb8a.ondigitalocean.app/api/add-banking-detail', data, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        if (response.status === 200 || response.status === 201) {
            setSnackbarMessage('Banking details saved successfully!');
            console.log("response.status",response.status)
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
            setTransferDestination('');
            setName('');
            setBranchNumber('');
            setBranchName('');
            setAccountType('');
            setAccountNumber('');
        } else {
            setSnackbarMessage('Failed to save banking details. Please try again.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    } catch (error) {
        console.error('Error saving banking details:', error);
        setSnackbarMessage('An error occurred while saving banking details. Please try again.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
    }
};

const handleSnackbarClose = () => {
    setOpenSnackbar(false);
};




useEffect(()=>{
  fetchCompanyDetails()
},[])
const fetchCompanyDetails = async () => {
  try {
    const response = await axios.get('https://invoice-system-gqb8a.ondigitalocean.app/api/get-all-companies', {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    });
    setCompanyDetails(response.data);
    console.log("response", response.data);
  } catch (error) {
    console.error('Error fetching banking details:', error);
  }
};

console.log("companyDetails",companyDetails.length)




  return (
    <>
      <Sidebar />


      <div className='companyContainers'>
        <div className='detail'>
          <p>{t('CDHead')}</p>
        </div>
        <div className='companytemplate'>
          <div>
            <label>{t('CDCOne')}:</label>
            <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
          </div>
          <div>
            <label>{t('CDCTwo')}:</label>
            <input value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div>
            <label>{t('CDCThree')}:</label>
            <input value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
          </div>

        </div>
        <div className='AddBtn'>
          {companyDetails.length >= 1 ? <button onClick={handleSave} style={{background:"#e0e0e0", color:"black"}} disabled >{t('CNBtnTwo')}</button> : <button  onClick={handleSave} >{t('CNBtnTwo')}</button>}
        </div>













        <div className='bankingContainer'>
          <div className='Bankingtemplate '  >


            <p className='BankingText'>{t('CDBDesc')}</p>

            <div>
                <div>
                    <label>{t('CDBOne')}:</label>
                    <input value={transferDestination} onChange={(e) => setTransferDestination(e.target.value)} />
                </div>
                <div>
                    <label>{t('CDBtwo')}:</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>{t('CDBThree')}:</label>
                    <input value={branchNumber} onChange={(e) => setBranchNumber(e.target.value)} />
                </div>
                <div>
                    <label>
                    {t('CDBFour')}:</label>
                    <input value={branchName} onChange={(e) => setBranchName(e.target.value)} />
                </div>
                <div>
                    <label>{t('CDBFive')}                  :</label>
                    <input value={accountType} onChange={(e) => setAccountType(e.target.value)} />
                </div>
                <div>
                    <label>{t('CDBSix')}                :</label>
                    <input value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
                </div>
            </div>

            
            <div className='AddBtn' onClick={handleSaveBankDetail}>
                <button>
                {t('CNBtnTwo')}
                </button>
            </div>
            </div>
            </div>






        <div className='companytemplate'>

          <div>
            <label>{t('CDTOne')}:</label>
            <input />
          </div>
          <div>
            <label>{t('CDTTwo')}:</label>
            <input type='file' />
          </div>


        </div>

        <div className='AddBtn'>
          <button>{t('CDTBtn')}</button>
        </div>

      </div>


      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <MuiAlert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
    </>
  )
}

export default CompanyInfo