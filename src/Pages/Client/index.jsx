import React from 'react'
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
import { IoChevronDownCircleOutline } from "react-icons/io5";



const Client = () => {  
  let clintData = [
    {
      name: "January",
    },{
      name: "Febuary",
    },{
      name: "March",
    },{
      name: "Apral",
    },{
      name: "Maye",
    },{
      name: "June",
    },
  ];
  const handleTextButtonClick = () => {
    alert("Text button clicked!");
  };
  return (
    <>
    <Sidebar /> 


  <div className='clientContainer'>
  <div className='detail'>
            <p> Client Detail</p>
          </div>

<button className='selectButton'>Select a Year <IoChevronDownCircleOutline className='selectIcon' /></button>


          <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align='center'  style={{ width:"25%", fontSize:"22px", fontWeight:600}}>Month</TableCell>
                    <TableCell align='center'  style={{width:"25%",fontSize:"22px", fontWeight:600}}>Attachment</TableCell>
                    <TableCell align='center'  style={{idth:"50%",fontSize:"22px", fontWeight:600}}>Action</TableCell>
                  </TableRow>
                </TableHead>


                <TableBody>
                  {clintData.map((row, index) => (



                    <TableRow key={index} className='table'>
                         <TableCell  align='center' component="th" scope="row">
                        {row.name}
                      </TableCell>


                      <TableCell align='center'>
                        
                        <button className='addButton'>Add <FiPlusCircle  className='addBtnIcon' /></button>
                        
                        </TableCell>

                        
                      <TableCell  sx={{display:"flex", justifyContent:"center", gap:"8px"}}>
                      <button onClick={handleTextButtonClick} className='invoiceBtn' >Create Invoice Note</button>
                      <button onClick={handleTextButtonClick} className='invoiceBtn'>Send Invoice</button> 
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