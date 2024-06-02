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

const Menu = () => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMemoId, setCurrentMemoId] = useState(null);
  const [project, setProject] = useState('');
  const [amount, setAmount] = useState('');
  const [saleTax, setSaleTax] = useState('');
  const [memos, setMemos] = useState([]);
  const jwtToken = useSelector((state) => state.authReducer.jwtToken);

  useEffect(() => {
    fetchMemos();
  }, []);

  const fetchMemos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/get-all-memos', {
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
        response = await axios.put(`http://localhost:5000/api/update-memo/${currentMemoId}`, newMemo, {
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
          },
        });
      } else {
        response = await axios.post('http://localhost:5000/api/add-memo', newMemo, {
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
          },
        });
      }

      if (response.status === 200 || response.status === 201) {
        console.log('Memo saved successfully');
        handleClose();
        fetchMemos(); // Refresh the memo list
      } else {
        console.error('Failed to save memo', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleOpenUpdate = (memo) => {
    setIsEditing(true);
    setCurrentMemoId(memo.id);
    setProject(memo.project);
    setAmount(memo.amountOfMoney);
    setSaleTax(memo.salesTax);
    setOpen(true);
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
          <p> Menu Detail</p>
        </div>
        <button className='saveButton' onClick={handleOpen}>Add Memo</button>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align='center' style={{ width:"10%", fontSize:"22px", fontWeight:600}}>*</TableCell>
                <TableCell align='center' style={{ width:"20%", fontSize:"22px", fontWeight:600}}>項目</TableCell>
                <TableCell align='center' style={{width:"20%",fontSize:"22px", fontWeight:600}}>金額</TableCell>
                <TableCell align='center' style={{width:"50%",fontSize:"22px", fontWeight:600}}>消費税（%）</TableCell>
                <TableCell align='center' style={{width:"50%",fontSize:"22px", fontWeight:600}}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {memos.map((row, index) => (
                <TableRow key={index} className='table'>
                  <TableCell align='center' component="th" scope="row">
                    {index}
                  </TableCell>
                  <TableCell align='center' component="th" scope="row">
                    {row.project}
                  </TableCell>
                  <TableCell align='center'>{row.amountOfMoney}$</TableCell>
                  <TableCell  align='center'>{row.salesTax}%</TableCell>
                  <TableCell align='center'>
                    <button onClick={() => handleOpenUpdate(row)} className='iconButton'>
                      <FaRegEdit className='icon' />
                    </button>
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
    </>
  );
};

export default Menu;
