import { useState } from 'react'
import "./info.css"
import Sidebar from "../../Components/Sidebar"
import { AiOutlinePlusCircle } from "react-icons/ai";
import axios from 'axios';
import { useSelector } from 'react-redux';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const CompanyInfo = () => {

  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const jwtToken = useSelector((state) => state.authReducer.jwtToken);


  const [transferDestination, setTransferDestination] = useState('');
  const [name, setName] = useState('');
  const [branchNumber, setBranchNumber] = useState('');
  const [branchName, setBranchName] = useState('');
  const [accountType, setAccountType] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');


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
      const response = await axios.post('http://localhost:5000/api/add-company', data, {
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
        const response = await axios.post('http://localhost:5000/api/add-banking-detail', data, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        if (response.status === 200 || response.status === 201) {
            setSnackbarMessage('Banking details saved successfully!');
            console.log("response.status",response.status)
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
            // Optionally, clear the form fields
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
  return (
    <>
      <Sidebar />


      <div className='companyContainers'>
        <div className='detail'>
          <p>Company Information</p>
        </div>
        <div className='companytemplate'>
          <div>
            <label>Company Name:</label>
            <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
          </div>
          <div>
            <label>Address:</label>
            <input value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div>
            <label>Email Address:</label>
            <input value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
          </div>

        </div>
        <div className='AddBtn'>
          <button onClick={handleSave} >Save</button>
        </div>













        <div className='bankingContainer'>
          <div className='Bankingtemplate '  >


            <p className='BankingText'>Banking Detail</p>

            <div>
                <div>
                    <label>お振込先:</label>
                    <input value={transferDestination} onChange={(e) => setTransferDestination(e.target.value)} />
                </div>
                <div>
                    <label>名義:</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>支店番号:</label>
                    <input value={branchNumber} onChange={(e) => setBranchNumber(e.target.value)} />
                </div>
                <div>
                    <label>支店名:</label>
                    <input value={branchName} onChange={(e) => setBranchName(e.target.value)} />
                </div>
                <div>
                    <label>口座の種類:</label>
                    <input value={accountType} onChange={(e) => setAccountType(e.target.value)} />
                </div>
                <div>
                    <label>口座番号:</label>
                    <input value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
                </div>
            </div>

            
            <div className='AddBtn' onClick={handleSaveBankDetail}>
                <button>
                    <AiOutlinePlusCircle style={{ fontSize: "20px", fontWeight: "900" }} /> Save
                </button>
            </div>
            </div>
            </div>






        <div className='companytemplate'>

          <div>
            <label>Tax Registration No. :</label>
            <input />
          </div>
          <div>
            <label>Upload Image :</label>
            <input type='file' />
          </div>


        </div>

        <div className='AddBtn'>
          <button>Update</button>
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