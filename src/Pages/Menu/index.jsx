import Sidebar from "../../Components/Sidebar"
import "./menu.css"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



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
                    <TableCell align='center'  style={{ width:"10%", fontSize:"22px", fontWeight:600}}>*</TableCell>
                    <TableCell align='center'  style={{ width:"20%", fontSize:"22px", fontWeight:600}}>	項目</TableCell>
                    <TableCell align='center'  style={{width:"20%",fontSize:"22px", fontWeight:600}}>金額</TableCell>
                    <TableCell align='center'  style={{idth:"50%",fontSize:"22px", fontWeight:600}}>消費税（%）</TableCell>
                  </TableRow>
                </TableHead>


                <TableBody>
                  {clintData.map((row, index) => (



                    <TableRow key={index} className='table'>
                      <TableCell  align='center' component="th" scope="row" >
                        {index}
                      </TableCell>
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