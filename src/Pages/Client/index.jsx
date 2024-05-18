import React,{useRef} from 'react'
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
  const [selectedDate, setSelectedDate] = React.useState('');

  // Function to handle change in date input
  const handleDateChange = (event) => {
    // Extracting the month and year from the selected date
    const selectedMonth = event.target.value.slice(5, 7);
    const selectedYear = event.target.value.slice(0, 4);

    // Updating the state to show only month and year
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

  
    // Function to generate a random email
    const generateRandomEmail = () => {
      const domains = ['example.com'];
      const names = ['user1'];
      const randomDomain = domains[Math.floor(Math.random() * domains.length)];
      const randomName = names[Math.floor(Math.random() * names.length)];
      return `${randomName}@${randomDomain}`;
    };
  
    // Function to handle button click
    const handleTextButtonClick = () => {
      const randomEmail = generateRandomEmail();
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${randomEmail}`;
      window.open(gmailUrl, '_blank');
    };
  


  return (
    <>
    <Sidebar /> 


  <div className='clientContainer'>
  <div className='detail'>
            <p> Client Detail</p>
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

                        
                      <TableCell  sx={{display:"flex", justifyContent:"center", gap:"8px"}}>
                      <NavLink  to="/bill" className='invoiceBtn'>Create Invoice Note</NavLink> 
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