import { useState, useEffect } from "react";
import "./bill.css";
import { IoChevronDown } from "react-icons/io5";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from "react-redux";
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const Bill = () => {
  const [copied, setCopied] = useState(false);
  const [bankingDetails, setBankingDetails] = useState([]);
  const [companyDetails, setCompanyDetails] = useState([]);
  const { id } = useParams();
  const jwtToken = useSelector((state) => state.authReducer.jwtToken);
  const [memos, setMemos] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [clintData, setClintData] = useState("");
  const [memoIds, setMemoIds] = useState([]);
  const [editedMemos, setEditedMemos] = useState([]);

  useEffect(() => {
    if (clintData && clintData.memos) {
      const memoIds = clintData.memos.map((memo) => memo.id);
      setMemoIds(JSON.stringify(memoIds));
    }
  }, [clintData]);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const fetchBankingDetails = async () => {
      try {
        const response = await axios.get('https://invoice-system-gqb8a.ondigitalocean.app/api/get-all-banking-details', {
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        });
        setBankingDetails(response.data);
      } catch (error) {
        console.error('Error fetching banking details:', error);
      }
    };

    const fetchCompanyDetails = async () => {
      try {
        const response = await axios.get('https://invoice-system-gqb8a.ondigitalocean.app/api/get-all-companies', {
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        });
        setCompanyDetails(response.data);
      } catch (error) {
        console.error('Error fetching company details:', error);
      }
    };

    const fetchClientById = async () => {
      try {
        const response = await axios.get(`https://invoice-system-gqb8a.ondigitalocean.app/api/get-client/${id}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        });
        if (response.status === 200) {
          setClintData(response.data);
        } else {
          console.error('Error:', response.data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const fetchMemos = async () => {
      try {
        const response = await axios.get('https://invoice-system-gqb8a.ondigitalocean.app/api/get-all-memos', {
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
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

    fetchBankingDetails();
    fetchCompanyDetails();
    fetchClientById();
    fetchMemos();
  }, [jwtToken, id]);



  useEffect(() => {
    if (memoIds.length > 0) {
      const assignMemosToClient = async (clientId, memoIds) => {
        console.log("clientId, memoIds",  memoIds);
        try {
          const response = await axios.put(
            `https://invoice-system-gqb8a.ondigitalocean.app/api/assign-memos-to-client/1`,

            {memoIds: ["4"]},
            {
              headers: {
                "Authorization": `Bearer ${jwtToken}`
              }
            }
          );

          if (response.status === 200) {
            console.log("Memos assigned to client successfully.", response);
          } else {
            console.error("Failed to assign memos to client:", response.statusText);
          }
        } catch (error) {
          console.error('Error:', error);
          alert("Failed to assign memos to client. Please try again.");
        }
      };

      assignMemosToClient(id, memoIds);
    }
  }, [memoIds, id, jwtToken]);

  const handleBankChange = (event) => {
    const selectedBankDetail = bankingDetails.find(detail => detail.name === event.target.value);
    setSelectedBank(selectedBankDetail);
  };






  // table
  const calculateTotal = (memo) => {
    const amountOfMoney = parseFloat(memo.amountOfMoney) || 0;
    const salesTax = parseFloat(memo.salesTax) || 0;
    return amountOfMoney * (salesTax / 100);
  };
  

  const calculateGrandTotal = (memos) => {
    let grandTotal = 0;
    memos.forEach((memo) => {
      grandTotal += calculateTotal(memo);
    });
    return parseFloat(grandTotal).toFixed(2);
  };


  const handleEditChange = (e, index, field) => {
    const newValue = e.target.value;
    setEditedMemos(prevState => {
      const updatedMemos = [...prevState];
      updatedMemos[index] = { ...updatedMemos[index], [field]: newValue };
      return updatedMemos;
    });

    if (field === 'amountOfMoney' || field === 'salesTax') {
      setMemos(prevMemos => {
        const updatedMemos = [...prevMemos];
        updatedMemos[index][field] = newValue === '' ? 0 : parseFloat(newValue);
        return updatedMemos;
      });
    }
  };
  
  
  
  const handleSaveEdits = async () => {
    try {
      const response = await axios.put(
        `https://invoice-system-gqb8a.ondigitalocean.app/api/update-memos`,
        { memos: editedMemos },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        }
      );
      if (response.status === 200) {
        console.log("Memos updated successfully.");
      } else {
        console.error("Failed to update memos:", response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
      alert("Failed to update memos. Please try again.");
    }
  };
  
  console.log("clintDataclintData",clintData)
  return (
    <>
      <div className='billHeader'>
        <p className='billHeading'>Your Bill</p>
        <div className='rightSection'>
          <div>
            <p>発行日</p>
            <p>11/05/2025</p>
          </div>
          <div>
            <p>お支払い期限</p>
            <p>11/05/2025</p>
          </div>
        </div>
      </div>
      <div style={{ textAlign: "right", marginTop: "20px", marginRight: "40px" }}>
        <button className="copy" onClick={handleCopy}>
          <span className="tooltip">
            {copied ? 'Copied!' : 'Copy to clipboard'}
          </span>
          <span>
            <svg className={`clipboard ${copied ? 'hidden' : ''}`} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 6.35 6.35">
              <path
                d="M2.43.265c-.3 0-.548.236-.573.53h-.328a.74.74 0 0 0-.735.734v3.822a.74.74 0 0 0 .735.734H4.82a.74.74 0 0 0 .735-.734V1.529a.74.74 0 0 0-.735-.735h-.328a.58.58 0 0 0-.573-.53zm0 .529h1.49c.032 0 .049.017.049.049v.431c0 .032-.017.049-.049.049H2.43c-.032 0-.05-.017-.05-.049V.843c0-.032.018-.05.05-.05zm-.901.53h.328c.026.292.274.528.573.528h1.49a.58.58 0 0 0 .573-.529h.328a.2.2 0 0 1 .206.206v3.822a.2.2 0 0 1-.206.205H1.53a.2.2 0 0 1-.206-.205V1.529a.2.2 0 0 1 .206-.206z"
                fill="currentColor"
              />
            </svg>
            <svg className={`checkmark ${copied ? '' : 'hidden'}`} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
              <path
                d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                fill="currentColor"
                style={{ color: "wheat" }}
              />
            </svg>
          </span>
        </button>
      </div>

      <div className='billSection'>
        <div>
          <div>
            <p className='billOneText'>To: {clintData.clientName}</p>
            <div className='billBoxOne'>
              <div>
                <table>
                  <tbody>
                    <tr>
                      <td>Name</td>
                      <td>{clintData.clientName}</td>
                    </tr>
                    <tr>
                      <td>Address</td>
                      <td>{clintData.address}</td>
                    </tr>
                    <tr>
                      <td>Company</td>
                      <td>{clintData.companyName}</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>{clintData.emailAddress}</td>
                    </tr>
                    <tr>
                      <td>Person In Charge</td>
                      <td>{clintData.personInCharge}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className='billDetail'>
            <p>御請求金額</p>
            <p>¥</p>
            <p>18.00</p>
          </div>
        </div>
        <div>
          <p className='billOneText'>From: Takoemi</p>
          <div className='billBoxOne'>
            {companyDetails.length > 0 ? (
              companyDetails.map((detail, index) => (
                <div key={index}>
                  <p>Bank Name: {detail.companyName}</p>
                  <p>Account Number: {detail.address}</p>
                  <p>Branch Name: {detail.emailAddress}</p>
                </div>
              ))
            ) : (
              <p>Loading banking details...</p>
            )}
          </div>
        </div>
      </div>

      <p style={{ textAlign: "center", margin: "30px 0" }}>Thank You For Continue Support. We Would Like to make a request as follow</p>







{/* table */}
<div className="bankingMainTable">
  <table className='table'>
    <thead>
      <tr className='tableHeading'>
        <th>項目</th>
        <th>個</th>
        <th>為替</th>
        <th>金額</th>
        <th>消費税率</th>
        <th>合計</th>
      </tr>
    </thead>
    <tbody className='tableBody'>
      {memos.length > 0 ? (
        memos.map((memo, index) => (
          <tr key={index}>
         <td>
  <input 
    type="text" 
    value={editedMemos[index]?.project || memo.project} 
    onChange={(e) => handleEditChange(e, index, 'project')} 
    onKeyDown={(e) => {
      // Check if the input is empty and backspace is pressed
      if (e.key === 'Backspace' && e.target.value === '') {
        // Remove the last character from the previous value
        handleEditChange({ target: { value: editedMemos[index]?.project || memo.project.slice(0, -1) } }, index, 'project');
      }
    }}
  />
</td>
<td><input type="text" value={editedMemos[index]?.quantity || memo.quantity} onChange={(e) => handleEditChange(e, index, 'quantity')} /></td>
<td><input type="text" value={editedMemos[index]?.exchangeRate || memo.exchangeRate} onChange={(e) => handleEditChange(e, index, 'exchangeRate')} /></td>
<td><input type="text" value={editedMemos[index]?.amountOfMoney || memo.amountOfMoney} onChange={(e) => handleEditChange(e, index, 'amountOfMoney')} /></td>
<td><input type="text" value={editedMemos[index]?.salesTax || memo.salesTax} onChange={(e) => handleEditChange(e, index, 'salesTax')} /></td>

            <td>{calculateTotal(memo)}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="6">Loading memos...</td>
        </tr>
      )}
      <tr>
        <td colSpan={4}></td>

        <td>Tax rate OF 10%</td>
        <td>10.00</td>
      </tr>
      <tr>
        <td colSpan={4}></td>
  
        <td>Tax rate of 8%</td>
        <td>8.00</td>
      </tr>
      <tr>
        <td colSpan={4}></td>
 
        <td>Tax rate of 5%</td>
        <td>5.00</td>
      </tr>
      <tr>
        <td colSpan='5'>合計</td>
        <td>{calculateGrandTotal(memos)}</td>
      </tr>
    </tbody>
  </table>
  <button onClick={handleSaveEdits}>Save Changes</button>
</div>














      <div className="bankContainer">
        <FormControl style={{ width: "160px" }}>
          <InputLabel id="bank-select-label">Select Bank</InputLabel>
          <Select
            labelId="bank-select-label"
            id="bank-select"
            value={selectedBank ? selectedBank.name : ""}
            onChange={handleBankChange}
            IconComponent={IoChevronDown}
          >
            {bankingDetails.map((detail, index) => (
              <MenuItem key={index} value={detail.name}>
                {detail.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <table>
          <thead></thead>
          <tbody className="bankTable">
            <tr>
              <td>Bank Name</td>
              <td>{selectedBank ? selectedBank.name : ""}</td>
            </tr>
            <tr>
              <td>Account Number</td>
              <td>{selectedBank ? selectedBank.accountNumber : ""}</td>
            </tr>
            <tr>
              <td>Branch Name</td>
              <td>{selectedBank ? selectedBank.branchName : ""}</td>
            </tr>
            <tr>
              <td>Branch Number</td>
              <td>{selectedBank ? selectedBank.branchNumber : ""}</td>
            </tr>
            <tr>
              <td>Account Type</td>
              <td>{selectedBank ? selectedBank.accountType : ""}</td>
            </tr>
            <tr>
              <td>Transfer Destination</td>
              <td>{selectedBank ? selectedBank.transferDestination : ""}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Bill;
