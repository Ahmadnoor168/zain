import React from 'react'
import Sidebar from "../../Components/Sidebar"
import "./menu.css"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FiPlusCircle } from "react-icons/fi";
import { IoChevronDownCircleOutline } from "react-icons/io5";


const Menu = () => {
  let clintData = [
    {
      course: "Programming",
      menu2: "10.11",
      menu3: "10%",

    },{
      course: "C++",
      menu2: "10.11",
      menu3: "10%",
    }
  ];
  const handleTextButtonClick = () => {
    alert("Text button clicked!");
  };
  return (
    <>
    <Sidebar />

    <div className='menuConainer'>
    <div className='detail'>
            <p> Menu Detail</p>
          </div>

          <TableContainer component={Paper} >
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
                        {row.course}
                      </TableCell>
                      <TableCell align='center'>{row.menu2}</TableCell>
                      <TableCell align='center'>{row.menu3}</TableCell>

                        
                    </TableRow>



                  ))}
                </TableBody>
              </Table>
            </TableContainer>


<button className='saveButton'>Save</button>
    </div>
    </>
  )
}

export default Menu