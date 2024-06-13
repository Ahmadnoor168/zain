import { useState, useEffect,useMemo  } from 'react';
import "./styles.css";

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
import { useSelector } from "react-redux";
import { FaCaretDown } from "react-icons/fa";
import { useTable, useGlobalFilter, useSortBy, usePagination } from 'react-table';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Input } from '@mui/material';


import axios from 'axios';
const Home = () => {
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [personInCharge, setPersonInCharge] = useState('');
  const [address, setAddress] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [image, setImage] = useState('');
  const [open, setOpen] = useState(false);
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
  const [clients, setClients] = useState([]);
  const [memos, setMemos] = useState([]);
  const [selectedMemo, setSelectedMemo] = useState('');


  const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);
  const uid = useSelector((state) => state.authReducer.uid);
  const jwtToken = useSelector((state) => state.authReducer.jwtToken);
  const message = useSelector((state) => state.authReducer.message);




  console.log("selectedMemo", selectedMemo)





  console.log("memos", memos)
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
    // Check if any required fields are empty
    if (!clientName || !companyName || !personInCharge || !address || !emailAddress || !image) {
      alert("Please fill out all required fields.");
      return;
    }

    // Get the selected memo's index


    let ids = JSON.stringify([selectedMemo]);
    console.log("ids", typeof ids)
    console.group("ids", ids)

    // Construct FormData object
    const formData = new FormData();

    // Append form fields to FormData
    formData.append('clientName', clientName);
    formData.append('companyName', companyName);
    formData.append('personInCharge', personInCharge);
    formData.append('address', address);
    formData.append('emailAddress', emailAddress);
    formData.append('notes', notes);
    formData.append('image', image);
    // formData.append('memoIds', JSON.stringify([selectedMemo]));
    formData.append('memoIds', ids);

    fetch('https://invoice-system-gqb8a.ondigitalocean.app/api/add-client', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then(response => {
        console.log("response", response)
        if (response.ok) {
          // Data saved successfully
          alert("Data saved successfully.");
          handleClose(); // Close the modal after saving
        } else {
          // Error handling
          throw new Error('Failed to save data.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert("Failed to save data. Please try again.");
      });
  };







  const handleSearch = () => {
    alert("Handle Search")
  }





  useEffect(() => {
    const fetchAllClients = async () => {
      try {
        // Make a GET request to fetch all clients
        const response = await axios.get('https://invoice-system-gqb8a.ondigitalocean.app/api/get-all-clients', {
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        });
        setClients(response.data);
      } catch (error) {
        console.error('Error:', error);
        alert("Failed to fetch data. Please try again.");
      }
    };
    fetchAllClients();
    return () => {
    };
  }, [jwtToken]);





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

  console.log("clint", clients)
  const [memoStates, setMemoStates] = useState(clintData.map(() => 'Designer'));

  const handleSelect = (event, index) => {
    const newMemoStates = [...memoStates];
    newMemoStates[index] = event.target.value;
    setMemoStates(newMemoStates);
  };











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
        setMemos(response.data);

      } else {
        console.error('Failed to fetch memos');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const filteredMemos = memos.filter(memo => memo.clientId === null);



  // 45564564

  const tableData = useMemo(() => {
    return clients.map((row, index) => ({
      ...row,
      index
    }));
  }, [clients]);

  const columns = useMemo(() => [
    {
      Header: 'Index',
      accessor: 'index',
    },
    {
      Header: 'Name',
      accessor: 'clientName',
    },
    {
      Header: 'Memo',
      accessor: 'memos',
      Cell: ({ value }) => (
        <p onClick={handleEdit} style={{cursor:"pointer", background: "#189ce4",borderRadius:"4px", padding: "10px", color: "white", display: "inline-block", textTransform:"none" , border:"none"}}>
          {value.length === 0 ? "Select New Memo" : value.map(memo => memo?.project).join(',')}
          <FaCaretDown style={{ fontSize:"15px",position:"relative", top:"2px",left:"3px"}} />
        </p>
      ),
    },
    {
      Header: 'Action',
      Cell: ({ row }) => (
        <div style={{ display: "flex" }}>
          <button onClick={handleOpen} className='iconButton'><FaRegEdit className='icon' /></button>
          <NavLink to="/client" className='actionButton' >Action  </NavLink>
        </div>
      ),
    },
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: tableData,
      initialState: { sortBy: [{ id: 'index', desc: false }] },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );


  const { globalFilter } = state;

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


              {/* <div className='searchContainer'>
                <input type='search' />
                <button onClick={handleSearch}>Search</button>
              </div> */}
              <Input
        value={globalFilter || ''}
        onChange={(e) => setGlobalFilter(e.target.value || undefined)}
        placeholder="Search"
      />
            </div>
            <div></div>
          </div>

          <div className='table'>
          <div>
      

      <TableContainer component={Paper} id="printable-table" {...getTableProps()}>
        <Table>
          <TableHead>
            {headerGroups.map(headerGroup => (
              <TableRow key={headerGroup.getHeaderGroupProps().key} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <TableCell key={column.getHeaderProps().key} {...column.getHeaderProps(column.getSortByToggleProps())}>
                    <span style={{  fontWeight: "600" }}>  {column.render('Header')}  </span>
                    <span style={{ marginLeft: '5px' }}>
                      <span style={{ color: column.isSorted && !column.isSortedDesc ? 'black' : 'lightgrey' }}>
                        🔼
                      </span>
                      <span style={{ color: column.isSorted && column.isSortedDesc ? 'black' : 'lightgrey' }}>
                        🔽
                      </span>
                    </span>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <TableRow key={row.getRowProps().key} {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <TableCell key={cell.getCellProps().key} {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
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
            <label>Select Memo</label>
            <Select
              sx={{ width: "360px" }}
              value={selectedMemo}
              onChange={(e) => setSelectedMemo(e.target.value)}
            >
              {filteredMemos.map((memo) => (
                <MenuItem key={memo.id} value={memo.id}>
                  {memo.project}
                </MenuItem>
              ))}
            </Select>

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
            {filteredMemos.map((memo) => (
              <div className='editBar' key={memo.id}>
                <div className='editOne'>
                  <Checkbox
                    checked={memo.checked}
                    onChange={(event) => handleChange(event, memo.id)}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                  <p>{memo.project}</p>
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
