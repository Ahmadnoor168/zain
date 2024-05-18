import React, { useState } from 'react';
import "./styles.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FaRegEdit } from "react-icons/fa";
import { HiOutlinePlusCircle } from "react-icons/hi";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Sidebar from '../../Components/Sidebar';
// import { MdOutlineExpandCircleDown } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { NavLink } from 'react-router-dom';

const Home = () => {
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [personInCharge, setPersonInCharge] = useState('');
  const [address, setAddress] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [image, setImage] = useState('');
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(true);
  const [edit, setEdit] = useState(false);
  const [checkedItems, setCheckedItems] = useState([
    { id: 1, label: 'Developer', checked: false },
    { id: 2, label: 'Developer', checked: false },
    { id: 3, label: 'Developer', checked: false },
  ]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseModal = () => setEdit(false);
  const handleEdit = () => setEdit(true);
  const handleEditModalClose = () => setEdit(false);


  const handleChange = (event, id) => {
    setCheckedItems(prevState => 
      prevState.map(item => 
        item.id === id ? { ...item, checked: event.target.checked } : item
      )
    );
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      //   handleClose(); 
    }
  };







  const handleSave = () => {
    alert("Save Data")
  }
  const handleSubmit = () => {
    const formData = {
      clientName,
      companyName,
      personInCharge,
      address,
      emailAddress,
      notes,
      image
    };
    console.log(formData); 
  };
  const handleSearch = () => {
    alert("Handle Search")
  }

  let clintData = [
    {
      name: "Jone Doe",
      memo: "Desginer",
    }, {
      name: "Karlo Angelo",
      memo: "Select New Memo",
    }, {
      name: "Joe",
      memo: "Developer",
    }, {
      name: "Joe Twin",
      memo: "Select new Memo",
    }, {
      name: "Ashle",
      memo: "Desginer",
    }, {
      name: "Jone Ashle",
      memo: "Developer",
    },
  ];






  const [memoStates, setMemoStates] = useState(clintData.map(() => 'Designer'));

  // Function to handle memo selection for a specific row
  const handleSelect = (event, index) => {
    const newMemoStates = [...memoStates];
    newMemoStates[index] = event.target.value;
    setMemoStates(newMemoStates);
  };

  return (
    <>
      <div className='container'>


        <Sidebar />



        <div className='contentContainer'>
          <div className='detail'>
            <p> Client Detail</p>
          </div>

          <div>
            <div className='addContainer'>
              <button className='addClint' onClick={handleOpen}><HiOutlinePlusCircle className='addIcon' />Add New Client</button>


              <div className='searchContainer'>
                <input type='search' />
                <button onClick={handleSearch}>Search</button>
              </div>
            </div>
            <div></div>
          </div>

          <div className='table'>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Index</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Memo</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
        {clintData.map((row, index) => (
          <TableRow key={index}>
            <TableCell component="th" scope="row">
              {index}
            </TableCell>
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                  value={memoStates[index]} 
                  onChange={(e) => handleSelect(e, index)}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  sx={{ color: "#189" }}
                >
                  <MenuItem value="Designer">
                    <em>Designer</em>
                  </MenuItem>
                  <MenuItem value={10}>Graphical Designer</MenuItem>
                  <MenuItem value={20}>Wordpress</MenuItem>
                  <MenuItem value={30}>Web Developer</MenuItem>
                </Select>
              </FormControl>
            </TableCell>
            <TableCell sx={{ display: "flex" }}>
                        <button onClick={handleEdit} className='iconButton'><FaRegEdit className='icon' /></button>
<NavLink to="/client" className='actionButton' >Action  </NavLink>

         </TableCell>
          </TableRow>
        ))}
      </TableBody>
              
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>








      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{ onClick: handleBackdropClick }}
      >
        <Box
          sx={{
            position: 'absolute',
            bgcolor: 'background.paper',
            boxShadow: 24,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: "clamp(300px, 100%, 800px)",
            overflow: "auto",
            maxHeight: '90vh',
            outline: "none",
            borderRadius: "6px"
          }}
          className="modal"

        >
          <p className='modalHeading'>Add New Client</p>

          <div>
            <label>Client Name</label>
            <input
              type="text"
              placeholder="Client Name"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
          </div>
          <div>
            <label>Company Name</label>
            <input
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div>
            <label>Person In Charge</label>
            <input
              type="text"
              placeholder="Person in Charge"
              value={personInCharge}
              onChange={(e) => setPersonInCharge(e.target.value)}
            />
          </div>
          <div>
            <label>Address</label>
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Email Address"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
          </div>
          <div>
            <label>Note</label>
            <textarea
              placeholder="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </div>
          <div>
            <label>Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div>
            <div className='modalButton'>
              <button onClick={handleSubmit}>
                Submit
              </button>
              <button onClick={handleClose}>
                Close
              </button>
            </div>
          </div>


        </Box>
      </Modal>




      <Modal
      open={edit}
      onClose={handleEditModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropProps={{ onClick: handleBackdropClick }}
    >
      <Box sx={{
        position: 'absolute',
        bgcolor: 'background.paper',
        boxShadow: 24,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "clamp(300px, 100%, 800px)",
        overflow: "auto",
        maxHeight: '90vh',
        outline: "none",
        borderRadius: "6px",
        padding: "10px 20px 40px 20px"
      }}>
        <p className='modalHeading'>Select Memo</p>
        <div style={{ maxWidth: "500px", margin: "auto" }}>
          {checkedItems.map((item) => (
            <div className='editBar' key={item.id}>
              <div className='editOne'>
                <Checkbox
                  checked={item.checked}
                  onChange={(event) => handleChange(event, item.id)}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
                <p>{item.label}</p>
              </div>
              <div className='editTwo'>
                <button onClick={handleOpen}>
                  <FaEdit className='editButton' />
                </button>
                <button>
                  <RiDeleteBin6Line className='deleteButton' />
                </button>
              </div>
            </div>
          ))}
          <p style={{ marginBottom: "20px", fontSize: "18px", fontWeight: "600" }}>Add New Memo</p>
          <div className='moadlAdd'>
            <input />
            <button>Add</button>
          </div>
          <div className='modalButton' style={{ marginTop: "30px" }}>
            <button onClick={handleSave}>
              Submit
            </button>
            <button onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      </Box>
    </Modal>


    </>
  );
};

export default Home;
