import { useState, useEffect, useMemo, useCallback,useRef  } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { language } from '../../Redux/authAction';
import { useDispatch } from 'react-redux';


const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};



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
  const [searchdata, setSearchdata] = useState('clientName');
  const jwtToken = useSelector((state) => state.authReducer.jwtToken);
  const lang = useSelector((state) => state.authReducer.lang);


  console.log("lang", lang)
  const [query, setQuery] = useState([]); // Add this line
  const [searchType, setSearchType] = useState({ value: "clientName", label: 'client' },);
  const [selectedFilter, setFilter] = useState(null);
  const [loading, setLoading] = useState(false);
const dispatch = useDispatch()

  const {t, i18n }=useTranslation()



  const changeLanguage = (lng) => {
    console.log("lng",lng)
    i18n.changeLanguage(lng);
    dispatch(language(lng));
  };



const navigation = useNavigate()


  const autocompleteRef = useRef(null);
  const handleClose = () => setOpen(false);
  const handleCloseModal = () => setEdit(false);
  const handleEditModalClose = () => setEdit(false);
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {}
  };
  const cancelSave = () => {
    setEditingMemoId(null);
  };
  const options = [
    { value: "clientName", label: 'client' },
    { value: "memo", label: 'memo' },
  ];
  const handleChange = (event, value) => {
    setSearchType(value); // Update searchType with the selected value
  };
  


  console.log("filter", searchType)




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
  
  
  const tb1Header = useMemo(() => t('tb1'), [t]);
  const tb2Header = useMemo(() => t('tb2'), [t]);
  const tb3Header = useMemo(() => t('tb3'), [t]);
  const tb4Header = useMemo(() => t('tb4'), [t]);




  const tableData = useMemo(() => {
    return clients.map((row, index) => ({
      ...row,
      index
    }));
  }, [clients]);

  const columns = useMemo(() => [
    {
      Header: `${tb1Header}`,
      accessor: 'index',
    },
    {
      Header: `${tb2Header}`,
      accessor: 'clientName',
    },
    {
      Header: `${tb3Header}`,
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
      Header: `${tb4Header}`,
      Cell: ({ row }) => (
        <div style={{ display: "flex" }}>
          <button onClick={() => handleOpen(row.original)} className='iconButton'><FaRegEdit className='icon' /></button>
          <NavLink to={`/client/${row.original.id}`}  className='actionButton' >Action  </NavLink>
        </div>
      ),
    },
  ], [tb1Header]);

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
  const handleMemoSearch = async (searchQuery) => {
    console.log("searchQuery",searchQuery, searchType.label, searchType.value)
    
    try {
      const response = await axios.get(`https://invoice-system-gqb8a.ondigitalocean.app/api/search?searchType=${searchType.label}&${searchType.value}=${searchQuery}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      });
      if (Array.isArray(response.data)) {
        setSearchdata(response.data);
      } else {
        console.error('Error: Response data is not an array');
      }

      setLoading(true)
      console.log("response.data", response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  // const debouncedMemoSearch = useCallback(debounce(handleMemoSearch, 300), []);

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
    if (query) {
      // debouncedMemoSearch(query);
      handleMemoSearch(query)
    }
  }, [query, searchQuery,searchType.label,searchType.value]);
  


  // const handleAutocompleteChange = (event, newValue) => {
  //   console.log('Selected value:', newValue,clients);
  //   setSearchQuery(newValue);
  // };

  const handleAutocompleteChange = (event, newValue) => {
    console.log('Selected value:', newValue);

    if(searchType.value === "clientName" && searchType.label === "client"){
      const selectedClient = clients.find(client => client.clientName === newValue);
      if (selectedClient) {
        console.log('Selected client details:', selectedClient?.id);
        navigation(`client/${selectedClient?.id}`)
      } else {
        alert("cannot assign memo to any one")
        console.log('No matching client found');
      }
      setSearchQuery(newValue);
    }else{

console.log("memo Logic")

let foundClient = null;

// Iterate through each client
for (let client of clients) {
  // Check if client.memos is an array and not empty
  if (Array.isArray(client.memos) && client.memos.length > 0) {
    // Iterate through each memo in the client's memos array
    for (let memo of client.memos) {
      // Check if the memo has a project key and if its value matches newValue
      if (memo.project === newValue) {
        foundClient = client;
        break;
      }
    }
  }
  // Break outer loop if a match is found
  if (foundClient) {
    break;
  }
}

// Log the found client's ID or a message if no match is found
if (foundClient) {
  console.log('Selected client ID:', foundClient.id);
  navigation(`client/${foundClient.id}`)
} else {
  console.log('No matching client found');
}

setSearchQuery(newValue);



    }

  };



  const [isChecked, setIsChecked] = useState(true);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    event.target.checked ? changeLanguage('jp') : changeLanguage('en')
  };
  return (
    <>
      <div className='container'>


        <Sidebar />



        <div className='contentContainer'>

          
          
          
          
          <div className='detail' style={{display:"flex", justifyContent:"space-between", paddingRight:"20px"}}>
            <p> {t("clintHead")}</p>

            <div className="checkbox-wrapper-10">
      <input 
        type="checkbox" 
        id="cb5" 
        className="tgl tgl-flip" 
        checked={isChecked} 
        onChange={handleCheckboxChange} 
      />
      <label htmlFor="cb5" data-tg-on="English" data-tg-off="Japnes" className="tgl-btn"></label>
    </div>
          </div>
          <div>
            <div className='addContainer'>
              <button className='addClint' onClick={() => handleOpen(null)}>
                <HiOutlinePlusCircle className='addIcon' />{t('btnOne')}
              </button>

        



            </div>








            <div></div>
          </div>
{  loading === true ? (
          <div style={{ display: "flex", border: "1px solid gray" }}>
          <Box sx={{ minWidth: 200 }}>
          <FormControl fullWidth>
  {/* <Autocomplete
    id="demo-simple-select"
    options={options}
    getOptionLabel={(option) => option.label}
    getOptionSelected={(option, value) => option === value} // Assuming options are simple strings
    value={selectedFilter}
    onChange={handleChange}
    renderTags={() => null} // This will hide the selected value from being displayed as a chip or tag
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
  /> */}


<Autocomplete
  id="demo-simple-select"
  options={options}
  getOptionLabel={(option) => option.label}
  getOptionSelected={(option, value) => option === value} // Assuming options are simple strings
  value={searchType} // Use searchType as the value
  onChange={handleChange}
  renderTags={() => null} // This will hide the selected value from being displayed as a chip or tag
  renderInput={(params) => (
    <TextField
      {...params}
      placeholder="Search By"
      sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'transparent',
            },
            '&:hover fieldset': {
              borderColor: 'transparent', 
            },
            '&.Mui-focused fieldset': {
              borderColor: 'transparent', 
            },
          },
        }}
      InputProps={{
        ...params.InputProps,
        endAdornment: null, // Remove the clear button
      }}
    />
  )}
/>




</FormControl>

    </Box>



            <Box style={{ flexGrow: "1" }}>
              <FormControl fullWidth>
                <Autocomplete
                  options={searchdata}  // Ensure searchdata is an array
                  getOptionLabel={(option) => option}  // Adjust based on the structure of your data
              
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Search Results"
                      sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'transparent',
            },
            '&:hover fieldset': {
              borderColor: 'transparent', 
            },
            '&.Mui-focused fieldset': {
              borderColor: 'transparent', 
            },
          },
        }}
                      variant="outlined"
                      onChange={(event) => setQuery(event.target.value)}
                      onClick={(event) =>{ 
                        event.stopPropagation()
                      }} 
                    />
                  )}
                  
                  onBlur={() => setOpen(false)} 
                  onChange={handleAutocompleteChange}
                />
              </FormControl>
            </Box>
          </div>

                ): null
}
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
          <p className='modalHeading'>{clientId ? `${t("modalTwo")}` : `${t("btnOne")}`}</p>

          <div>
            <label> {t("modalTwoInOne")}</label>
            <input
              type="text"
              placeholder={`${t("modalTwoInOne")}`}
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
          </div>
          <div>
            <label>{t("modalTwoInTwo")}</label>
            <input
              type="text"
              placeholder={`${t("modalTwoInTwo")}`}
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div>
            <label>{t("modalTwoInThree")}</label>
            <input
              type="text"
              placeholder={`${t("modalTwoInThree")}`}
              value={personInCharge}
              onChange={(e) => setPersonInCharge(e.target.value)}
            />
          </div>
          <div>
            <label>{t("modalTwoInFour")}</label>
            <input
              type="text"
              placeholder={`${t("modalTwoInFour")}`}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <label>{t("modalTwoInFive")}</label>
            <input
              type="email"
              placeholder={`${t("modalTwoInFive")}`}
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
          </div>
          <div>
            <label>{t("modalTwoInSix")}</label>
            <textarea
              placeholder={`${t("modalTwoInSix")}`}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </div>
          <div>
            <label>{t("modalTwoInSeven")}</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>


          <div>
            <label>{t("modalTwoInEight")}</label>
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
                {clientId ? `${t("modalTwoInOne")}` : `${t("modalTwoBtnSub")}`}
              </button>
              <button onClick={handleClose}>
              {t("modalTwoBtn")}
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
