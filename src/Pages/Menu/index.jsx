import React, { useState, useEffect } from 'react';
import Sidebar from "../../Components/Sidebar";
import "./menu.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FaRegEdit } from "react-icons/fa";
import { Snackbar, Alert } from '@mui/material';
import { RiDeleteBin6Line } from "react-icons/ri";
import { useTranslation } from 'react-i18next';


const Menu = () => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMemoId, setCurrentMemoId] = useState(null);
  const [project, setProject] = useState('');
  const [amount, setAmount] = useState('');
  const [saleTax, setSaleTax] = useState('');
  const [memos, setMemos] = useState([]);
  const jwtToken = useSelector((state) => state.authReducer.jwtToken);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const {t, i18n }=useTranslation()


  useEffect(() => {
    fetchMemos();
    
  }, []);

  const fetchMemos = async () => {
    try {
      const response = await axios.get('https://invoice-system-gqb8a.ondigitalocean.app/api/get-all-memos', {
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
        },
      });
      if (response.status === 200) {
        console.log('Memos:', response.data);
        setMemos(response.data); 
      } else {
        console.error('Failed to fetch memos');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };




  const handleOpen = () => {
    setIsEditing(false);
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
    setCurrentMemoId(null);
    setProject('');
    setAmount('');
    setSaleTax('');
  };

  const handleSave = async () => {
    const newMemo = {
      project,
      amountOfMoney: amount,
      salesTax: saleTax,
    };

    try {
      let response;
      if (isEditing) {
        response = await axios.put(`https://invoice-system-gqb8a.ondigitalocean.app/api/update-memo/${currentMemoId}`, newMemo, {
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
          },
        });
      } else {
        response = await axios.post('https://invoice-system-gqb8a.ondigitalocean.app/api/add-memo', newMemo, {
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
          },
        });
      }

      if (response.status === 200 || response.status === 201) {
        setSnackbarMessage('Memo saved successfully');
        setSnackbarSeverity('success');
        handleClose();
        fetchMemos(); // Refresh the memo list
      } else {
        setSnackbarMessage('Failed to save memo');
        setSnackbarSeverity('error');
        console.error('Failed to save memo', response);
      }
    } catch (error) {
      setSnackbarMessage('Error saving memo');
      setSnackbarSeverity('error');
      console.error('Error:', error);
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

  const handleOpenUpdate = (memo) => {
    setIsEditing(true);
    setCurrentMemoId(memo.id);
    setProject(memo.project);
    setAmount(memo.amountOfMoney);
    setSaleTax(memo.salesTax);
    setOpen(true);
  };


  const deleteMemo = async (row) => {
    console.log("row-=", row.id);
    try {
      const response = await axios.delete(`https://invoice-system-gqb8a.ondigitalocean.app/api/delete-memo/${row.id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      });

      if (response.status === 200) {
        console.log("Memo deleted successfully.");
        setSnackbarMessage('Memo deleted successfully');
        setSnackbarSeverity('success');
        fetchMemos();
      } else {
        setSnackbarMessage('Failed to delete memo');
        setSnackbarSeverity('error');
        console.error('Error:', response.data);
      }
    } catch (error) {
      setSnackbarMessage('Error deleting memo');
      setSnackbarSeverity('error');
      console.error('Error:', error);
    } finally {
      setSnackbarOpen(true);
    }
  };



  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Sidebar />

      <div className='menuConainer'>
        <div className='detail'>
          <p>{t('MenuHead')}</p>
        </div>
        <button className='saveButton' onClick={handleOpen}>{t('MenuBtn')}</button>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align='center' style={{ width:"10%", fontSize:"18px", fontWeight:600}}>{t('MenuOne')}</TableCell>
                <TableCell align='center' style={{ width:"20%", fontSize:"18px", fontWeight:600}}>{t('MenuTwo')}</TableCell>
                <TableCell align='center' style={{width:"20%",fontSize:"18px", fontWeight:600}}>{t('MenuThree')}                </TableCell>
                <TableCell align='center' style={{width:"50%",fontSize:"18px", fontWeight:600}}>{t('MenuFour')}</TableCell>
                <TableCell align='center' style={{width:"50%",fontSize:"18px", fontWeight:600}}>{t('MenuFive')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {memos.map((row, index) => (
                <TableRow key={index} className='table'>
                  <TableCell align='center' component="th" scope="row">
                    {index+1}
                  </TableCell>
                  <TableCell align='center' component="th" scope="row">
                    {row.project}
                  </TableCell>
                  <TableCell align='center'>{row.amountOfMoney}$</TableCell>
                  <TableCell  align='center'>{row.salesTax}%</TableCell>
                  <TableCell align='center' style={{display:'flex', gap:"10px"}}>
                    <button onClick={() => handleOpenUpdate(row)} className='iconButton'>
                      <FaRegEdit className='icon' />
                    </button>
                    <div className='deleteBtn'>
                    <button onClick={() => deleteMemo(row)}>
                        <RiDeleteBin6Line className='deleteButton' />
                      </button>
                      </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Modal
          open={open}
          onClose={(event, reason) => {
            if (reason !== 'backdropClick') {
              handleClose();
            }
          }}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={style}>
            <h2 id="modal-title">{isEditing ? 'Edit Memo' : 'Add Memo'}</h2>
            <TextField
              autoFocus
              margin="dense"
              id="project"
              label="Project"
              type="text"
              fullWidth
              variant="standard"
              value={project}
              onChange={(e) => setProject(e.target.value)}
            />
            <TextField
              margin="dense"
              id="amount"
              label="Amount"
              type="text"
              fullWidth
              variant="standard"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <TextField
              margin="dense"
              id="saleTax"
              label="Sale Tax"
              type="text"
              fullWidth
              variant="standard"
              value={saleTax}
              onChange={(e) => setSaleTax(e.target.value)}
            />
            <Button onClick={handleClose} sx={{ mt: 2 }}>Close</Button>
            <Button onClick={handleSave} sx={{ mt: 2, ml: 2 }}>{isEditing ? 'Update' : 'Save'}</Button>
          </Box>
        </Modal>
      </div>


      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Menu;
