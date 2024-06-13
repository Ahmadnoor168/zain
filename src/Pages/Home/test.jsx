import { useState, useEffect, useMemo } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { HiOutlinePlusCircle } from "react-icons/hi";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Sidebar from '../../Components/Sidebar';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import { FaCaretDown } from "react-icons/fa";
import { useTable, useGlobalFilter, useSortBy, usePagination } from 'react-table';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Input } from '@mui/material';
import { FaRegSave } from "react-icons/fa";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import "./styles.css";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import {  TextField, Autocomplete } from '@mui/material';



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
  const [editingMemoId, setEditingMemoId] = useState(null);
  const [project, setProject] = useState('');
  const [selectedMemos, setSelectedMemos] = useState([]);
  const [clients, setClients] = useState([]);
  const [memos, setMemos] = useState([]);
  const [selectedMemo, setSelectedMemo] = useState('');
  const [clientId, setClientId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('client');
  const [searchdata, setSearchdata] = useState('clientName');
  const jwtToken = useSelector((state) => state.authReducer.jwtToken);
  const [searchResults, setSearchResults] = useState([]); // Add this line
  const [query, setQuery] = useState([]); // Add this line
  const [selectedFilter, setFilter] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  
  const handleClose = () => setOpen(false);
  const handleCloseModal = () => setEdit(false);
  const handleEditModalClose = () => setEdit(false);
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {}
  };
  const cancelSave = () => {
    setEditingMemoId(null);
  };




  // const handleAddSearch =(v1,v2)=>{
  //   console.log("v1,v2",v1,v2)
  //   setSearchType(v1)
  //   setSearchdata(v2)
  // }


  const options = [
    { value: "clientName", label: 'client' },
    { value: "memo", label: 'memo' },
  ];


console.log("filter",selectedFilter)


  const handleChange = (event, newValue) => {
    setFilter(newValue);
  };




  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  




 



  useEffect(() => {
    fetchAllClients();
    fetchMemos();
    return () => {
    };
  }, [jwtToken]);






  const handleOpen = (rowData) => {

    if (rowData !== null) {
      setClientId(rowData.id);
      setClientName(rowData.clientName);
      setCompanyName(rowData.companyName);
      setPersonInCharge(rowData.personInCharge);
      setAddress(rowData.address);
      setEmailAddress(rowData.emailAddress);
      setNotes(rowData.notes);
    } else {
      setClientId(null);
      setClientName('');
      setCompanyName('');
      setPersonInCharge('');
      setAddress('');
      setEmailAddress('');
      setNotes('');
      setImage('');
    }
    setOpen(true);
  };




  const handleEdit = (rowData) => {
    if (rowData && rowData.original && rowData.original.memos) {
      setSelectedMemos(rowData.original.memos);
    }
    setEdit(true);
  };


   const handleSubmit = async () => {
    if (!clientId) { // Adding a new client
      if (!clientName || !companyName || !personInCharge || !address || !emailAddress || !image || !selectedMemo) {
        setSnackbarMessage("Please fill out all required fields.");
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        return;
      }
    } else { // Updating an existing client
      if (!clientName || !companyName || !personInCharge || !address || !emailAddress) {
        setSnackbarMessage("Please fill out all required fields.");
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        return;
      }
    }

    const formData = new FormData();
    formData.append('clientName', clientName);
    formData.append('companyName', companyName);
    formData.append('personInCharge', personInCharge);
    formData.append('address', address);
    formData.append('emailAddress', emailAddress);
    formData.append('notes', notes);
    formData.append('image', image);
    if (selectedMemo) {
      let ids = JSON.stringify([selectedMemo]);
      formData.append('memoIds', ids);
    }

    try {
      if (clientId) {
        await updateClient(formData);
      } else {
        await addClient(formData);
      }
      fetchAllClients();
      handleClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const updateClient = async (formData) => {
    try {
      const response = await axios.put(`https://invoice-system-gqb8a.ondigitalocean.app/api/update-client/${clientId}`, formData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      });
      setSnackbarMessage("Client updated successfully.");
      setSnackbarSeverity('success');
      setClients(prevClients => prevClients.map(client =>
        client.id === clientId ? { ...client, clientName, companyName, personInCharge, address, emailAddress, notes } : client
      ));
    } catch (error) {


      
      setSnackbarMessage("Failed to update client. Please try again.");
      setSnackbarSeverity('error');
      console.error('Error:', error);
    } finally {
      setSnackbarOpen(true);
    }
  };
 const addClient = async (formData) => {
    try {
      const response = await axios.post('https://invoice-system-gqb8a.ondigitalocean.app/api/add-client', formData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      });
      setSnackbarMessage("Client added successfully.");
      setSnackbarSeverity('success');
      setClients(prevClients => [...prevClients, response.data]);
    } catch (error) {
      setSnackbarMessage("Failed to add client. Please try again.");
      setSnackbarSeverity('error');
      console.error('Error:', error);
    } finally {
      setSnackbarOpen(true);
    }
  };



  const deleteMemo = async (memoId) => {
    try {
      const response = await axios.delete(`https://invoice-system-gqb8a.ondigitalocean.app/api/delete-memo/${memoId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      });
  
      if (response.status === 200) {
        setSelectedMemos(prevMemos => prevMemos.filter(memo => memo.id !== memoId));
        fetchMemos()
        fetchAllClients();
        setSnackbarMessage('Delete memo successfully');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);

      } else {
        console.error('Error:', response.data);
        alert("Failed to delete memo. Please try again.");
      }
    } catch (error) {
      console.error('Error:', error);
      alert("Failed to delete memo. Please try again.");
    }
  };
  const handleUpdateMemo = async (memo) => {
    const updatedMemo = {
      project: project || memo.project,
      amountOfMoney: memo.amountOfMoney,
      salesTax: memo.salesTax,
    };

    try {
      const response = await axios.put(`https://invoice-system-gqb8a.ondigitalocean.app/api/update-memo/${memo.id}`, updatedMemo, {
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
        },
      });

      setSelectedMemos(prevMemos =>
        prevMemos.map(m => (m.id === memo.id ? { ...m, ...updatedMemo } : m))
      );
      setEditingMemoId(null);
      setProject('');
      setEditingMemoId(null);
      fetchMemos()
      setSnackbarMessage('Memo updated successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
        } catch (error) {
      console.error('Error:', error);
      alert("Failed to update memo. Please try again.");
    }
  };
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
      Cell: ({ value, row }) => {
        const lastMemo = value && value.length > 0 ? value[value.length - 1] : null;
        return (
          <p
            onClick={() => handleEdit(row)}
            style={{
              cursor: "pointer",
              background: "#189ce4",
              borderRadius: "4px",
              padding: "10px",
              color: "white",
              display: "inline-block",
              textTransform: "none",
              border: "none"
            }}
          >
            {lastMemo ? lastMemo.project : "Select New Memo"}
            <FaCaretDown style={{ fontSize: "15px", position: "relative", top: "2px", left: "3px" }} />
          </p>
        );
      },
    },

    {
      Header: 'Action',
      Cell: ({ row }) => (
        <div style={{ display: "flex" }}>
          <button onClick={() => handleOpen(row.original)} className='iconButton'><FaRegEdit className='icon' /></button>
          <NavLink to={`/client/${row.original.id}`}  className='actionButton' >Action  </NavLink>
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


  // const { globalFilter } = state;
  




  // const handleMemoSearch = async (query) => {
  //   console.log("query",query)
  //   try {
  //     const response = await axios.get(`https://invoice-system-gqb8a.ondigitalocean.app/api/search?searchType=${searchType}&${searchdata}=${query}`, {
  //       headers: {
  //         Authorization: `Bearer ${jwtToken}`
  //       }
  //     });
  //     console.log('Search Results:', response.data);
  //     // setClients(response.data)
  //   } catch (error) {
  //     console.error('Error:', error);
  //     if (error.response && error.response.status === 401) {
  //       alert("Unauthorized: Invalid or expired token. Please log in again.");
  //     } else {
  //       alert("Failed to search memos. Please try again.");
  //     }
  //   }
  // };


  const handleMemoSearch = async () => {
    // alert()
    console.log("selectedFilter.label",selectedFilter.label,selectedFilter.value, query)
    try {
      const response = await axios.get(`https://invoice-system-gqb8a.ondigitalocean.app/api/search?searchType=${selectedFilter.label}&${selectedFilter.value}=${query}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      });
      setSearchdata(response.data);
      console.log("response.data", response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchAllClients = async () => {
    try {
      const response = await axios.get('https://invoice-system-gqb8a.ondigitalocean.app/api/get-all-clients', {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      });
  console.log("response.dataresponse.data",response.data)
      setClients(response.data);
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status === 401) {
        alert("Unauthorized: Invalid or expired token. Please log in again.");
      } else {
        alert("Failed to fetch data. Please try again.");
      }
    }
  };

  useEffect(() => {
    console.log("query11111",query)
      handleMemoSearch(searchQuery); // Call search API when search query changes
  }, [searchQuery, selectedFilter, query]);








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
              <button className='addClint' onClick={() => handleOpen(null)}>
                <HiOutlinePlusCircle className='addIcon' />Add New Client
              </button>






      {/* <div className="search-bar">
      <input
        type="text"
        placeholder="Search Memos"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={() => handleMemoSearch(searchQuery)}>Search</button>

          <button onClick={()=> handleAddSearch("client","clientName")}>Client</button>
          <button onClick={()=> handleAddSearch("memo","memo")}>Memo</button>
        </div> */}




            </div>
            <div></div>
          </div>

<div style={{display:"flex", border:"1px solid gray"}}>
<Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
      <Autocomplete
          id="demo-simple-select"
          options={options}
          getOptionLabel={(option) => option.label}
          getOptionSelected={(option, value) => option === value} // Assuming options are simple strings

          value={selectedFilter}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search By"
              // sx={{
              //   '& .MuiOutlinedInput-root': {
              //     '& fieldset': {
              //       borderColor: 'transparent',
              //     },
              //     '&:hover fieldset': {
              //       borderColor: 'transparent', 
              //     },
              //     '&.Mui-focused fieldset': {
              //       borderColor: 'transparent', 
              //     },
              //   },
              // }}
            />
          )}
        />

      </FormControl>
    </Box>




      <Box style={{ flexGrow: "1" }}>
    <FormControl fullWidth>
      <Autocomplete
        options={searchdata} 
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search Results"
            variant="outlined"
            onChange={(event) => setQuery(event.target.value)}
            onClick={(event) => event.stopPropagation()} 
          />
        )}
        onChange={(event, newValue) => setSearchQuery(newValue)} 
        onBlur={() => setOpen(false)} 
      />
    </FormControl>
  </Box>







   
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
                            <span style={{ fontWeight: "600" }}>  {column.render('Header')}  </span>
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
          <p className='modalHeading'>{clientId ? 'Update Client' : 'Add New Client'}</p>

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
                {clientId ? 'Update' : 'Submit'}
              </button>
              <button onClick={handleClose}>
                Close
              </button>
            </div>
          </div>


        </Box>
      </Modal>


      return (
      <>
        {/* ...existing code... */}

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
              {selectedMemos.map((memo) => (
                <div className='editBar' key={memo.id}>
                  <div className='editOne'>
                    {editingMemoId === memo.id ? (
                      <input
                        type="text"
                        value={project}
                        onChange={(e) => setProject(e.target.value)}
                        placeholder="Project"
                      />
                    ) : (
                      <p>{memo.project}</p>
                    )}
                  </div>




                  <div className='editTwo'>
                    {editingMemoId === memo.id ? (
                      <button onClick={() => handleUpdateMemo(memo)}>
                        <FaRegSave className='editButton' />
                      </button>
                    ) : (
                      <button onClick={() => {
                        setEditingMemoId(memo.id);
                        setProject(memo.project);
                      }}>
                        <FaEdit className='editButton' />
                      </button>
                    )}


                    {editingMemoId === memo.id ? (
                      <button onClick={cancelSave}>
                        <MdOutlineCancelPresentation className='editButton' />
                      </button>
                    ) : (
                      <button onClick={() => deleteMemo(memo.id)}>
                        <RiDeleteBin6Line className='deleteButton' />
                      </button>
                    )}




                  </div>
                </div>
              ))}
            </div>



            <div className='modalButton' style={{ marginTop: "30px" }}>
              <button onClick={handleCloseModal}>
                Cancel
              </button>
            </div>
          </Box>
        </Modal>

        {/* ...existing code... */}
      </>
      );

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Home;
