import { useState, useEffect } from "react";
import "./bill.css";
import { IoChevronDown } from "react-icons/io5";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from "react-redux";
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';



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
  const [btnChange, setBtnChange] = useState(true);
  const {t, i18n }=useTranslation()
  const [taxRates, setTaxRates] = useState({
    rate10: 10,
    rate8: 8,
    rate5: 5,
  });
  const [taxHeading, setTaxHeading] = useState({
    rate10: "Tax rate OF 10%",
    rate8: "Tax rate of 8%",
    rate5: "Tax rate of 5%",
  });


  useEffect(() => {
    if (clintData && clintData.memos) {
      const memoIds = clintData.memos.map((memo) => memo.id);
      setMemoIds(JSON.stringify(memoIds));
    }
  }, [clintData]);
  const handleCopy = async () => {
    try {
      // Get the container element containing the data to copy
      const container = document.getElementById('data-container');
      
      // Create a new element to hold the text content
      const textElement = document.createElement('textarea');
      textElement.style.position = 'fixed';  // Ensure it's offscreen
      textElement.style.opacity = 0;          // Ensure it's invisible
      textElement.value = getTextFromElement(container);
  
      // Append the text element to the body
      document.body.appendChild(textElement);
      
      // Select and copy the text content
      textElement.select();
      document.execCommand('copy');
      
      // Remove the temporary text element
      document.body.removeChild(textElement);
      
      // Set copied state to true and reset after 2 seconds
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying data:', error);
    }
  };
  
  // Function to extract text content from an HTML element
  const getTextFromElement = (element) => {
    let text = '';
    // Iterate through the child nodes of the element
    for (const node of element.childNodes) {
      // If it's a text node, add its text content
      if (node.nodeType === Node.TEXT_NODE) {
        text += node.textContent;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // If it's an element node, recursively get text content
        text += getTextFromElement(node);
      }
    }
    return text;
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
          setMemos(response.data.memos)
        } else {
          console.error('Error:', response.data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    // const fetchMemos = async () => {
    //   try {
    //     const response = await axios.get('https://invoice-system-gqb8a.ondigitalocean.app/api/get-all-memos', {
    //       headers: {
    //         Authorization: `Bearer ${jwtToken}`
    //       }
    //     });
    //     if (response.status === 200) {
    //       setMemos(response.data);

    //       console.log("response.data",response.data)
    //     } else {
    //       console.error('Failed to fetch memos');
    //     }
    //   } catch (error) {
    //     console.error('Error:', error);
    //   }
    // };

    fetchBankingDetails();
    fetchCompanyDetails();
    fetchClientById();
    // fetchMemos();
  }, [jwtToken, id]);




  const handleSaveEdits = () => {
    setBtnChange(false);
    const newMemo = {
      project: '',
      quantity: '',
      exchangeRate: '',
      amountOfMoney: '',
      salesTax: '',
    };
  
    // Add the new memo to the state
  setMemos(prevMemos => [...prevMemos, newMemo]);
  };

  const saveData = async () => {
    const newMemoIndex = memos.length - 1;
    const newMemo = memos[newMemoIndex];

    if (!newMemo.project || !newMemo.amountOfMoney || !newMemo.salesTax) {
        console.log("One or more input fields are blank. Data not saved.");
        return; 
    }
alert("work")
  
};

  
  
  




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



      
      grandTotal += calculateTotal(memo) ;
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

    setMemos(prevMemos => {
        const updatedMemos = [...prevMemos];
        updatedMemos[index] = { ...updatedMemos[index], [field]: newValue };
        return updatedMemos;
    });
};





  const handleTaxRateChange = (e, rate) => {
    const newRate = e.target.value;
    setTaxRates(prevRates => ({
      ...prevRates,
      [rate]: newRate,
    }));
  };

  const handleHeadingRateChange = (e, rate) => {
    const newRate = e.target.value;
    setTaxHeading(prevRates => ({
      ...prevRates,
      [rate]: newRate,
    }));
  };

  console.log("clintDataclintData", clintData)
  return (
    <>
    <div id="data-container">
      <div className='billHeader'>
        <p className='billHeading'>{t('cliDet')}</p>
        <div className='rightSection'>
          <div>
            <p>{t('CNHDate')}</p>
            <p>11/05/2025</p>
          </div>
          <div>
            <p>{t('CNHDateDead')}</p>
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
            <p className='billOneText'>{t('CNTo')}: {clintData.clientName}</p>
                <table className="clintTable">
                    <tr>
                      <td>{t('CNCOne')}</td>
                      <td>{clintData.clientName}</td>
                    </tr>
                    <tr>
                      <td>{t('CNCTwo')}</td>
                      <td>{clintData.address}</td>
                    </tr>
                    <tr>
                      <td>{t('CNCThree')}</td>
                      <td>{clintData.companyName}</td>
                    </tr>
                    <tr>
                      <td>{t('CNCFour')}</td>
                      <td>{clintData.emailAddress}</td>
                    </tr>
                    <tr>
                      <td>{t('CNCFive')}</td>
                      <td>{clintData.personInCharge}</td>
                    </tr>
   
                </table>
          </div>
          <div className='billDetail'>
            <p>{t('CNBillAmount')}</p>
            <p>¥</p>
            <p>18.00</p>
          </div>
        </div>
        <div>
          <p className='billOneText'>From: Takoemi</p>
          <div>
<div>
{companyDetails.length > 0 ? (
  companyDetails.map((detail, index) => (
    <table key={index} className="clintTable">
        <tr>
          <td> {t('CNBOne')}</td>
          <td>{detail.companyName}</td>
        </tr>
        <tr>
          <td>{t('CNBTwo')}</td>
          <td>{detail.address}</td>
        </tr>
        <tr>
          <td>{t('CNBThree')}</td>
          <td>{detail.emailAddress}</td>
        </tr>
    </table>
  ))
) : (
  <table>
    <tbody>
      <tr>
        <td colSpan="2">Loading banking details...</td>
      </tr>
    </tbody>
  </table>
)}

</div>

</div>

        </div>
      </div>

      <p style={{ textAlign: "center", margin: "30px 0" }}>{t('CNDisc')}</p>







      {/* table */}
      <div className="bankingMainTable">
        <table className='table'>
          <thead>
            <tr className='tableHeading'>
              <th>{t('CNTOne')}</th>
              <th>{t('CNTTwo')}</th>
              <th>{t('CNTThree')}</th>
              <th>{t('CNTFour')} </th>
              <th>{t('CNTFive')} </th>
              <th>{t('CNTSix')}</th>
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
                      id="projectInput"
                      onKeyDown={(e) => {
                        // Check if the input is empty and backspace is pressed
                        if (e.key === 'Backspace' && e.target.value === '') {
                          // Remove the last character from the previous value
                          handleEditChange({ target: { value: editedMemos[index]?.project || memo.project.slice(0, -1) } }, index, 'project');
                        }
                      }}
                    />
                  </td>
                  <td><input id="quantityInput" type="text" value={editedMemos[index]?.quantity || memo.quantity} onChange={(e) => handleEditChange(e, index, 'quantity')} /></td>
                  <td><input id="exchangeRateInput" type="text" value={editedMemos[index]?.exchangeRate || memo.exchangeRate} onChange={(e) => handleEditChange(e, index, 'exchangeRate')} /></td>
                  <td><input id="amountOfMoneyInput" type="text" value={editedMemos[index]?.amountOfMoney || memo.amountOfMoney} onChange={(e) => handleEditChange(e, index, 'amountOfMoney')} /></td>
                  <td><input id="salesTaxInput" type="text" value={editedMemos[index]?.salesTax || memo.salesTax} onChange={(e) => handleEditChange(e, index, 'salesTax')} /></td>

                  <td>{calculateTotal(memo)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">Loading memos...</td>
              </tr>
            )}
            <tr>
              <td colSpan={4} style={{border:"none"}}></td>

              <td> <input
                type="text"
                value={taxHeading.rate10}
                onChange={(e) => handleHeadingRateChange(e, 'rate10')}
              /></td>
              <td><input
                type="number"
                value={taxRates.rate10}
                onChange={(e) => handleTaxRateChange(e, 'rate10')}
              />
              </td>
            </tr>
            <tr>
              <td colSpan={4} style={{border:"none"}}></td>

              <td> <input
                type="text"
                value={taxHeading.rate8}
                onChange={(e) => handleHeadingRateChange(e, 'rate8')}
              /></td>
              <td> <input
                type="number"
                value={taxRates.rate8}
                onChange={(e) => handleTaxRateChange(e, 'rate8')}
              /></td>
            </tr>
            <tr>
              <td colSpan={4} style={{border:"none"}}></td>

              <td > <input
                type="text"
                value={taxHeading.rate5}
                onChange={(e) => handleHeadingRateChange(e, 'rate5')}
              /></td>
              <td><input
                type="number"
                value={taxRates.rate5}
                onChange={(e) => handleTaxRateChange(e, 'rate5')}
              /></td>
            </tr>
            <tr>
            <td colSpan={4} style={{border:"none"}}></td>
              <td  >合計</td>
              <td>{calculateGrandTotal(memos)}</td>
            </tr>
          </tbody>
        </table>
        <div style={{ textAlign:'center', marginTop:'20px'}}> 
       {btnChange ? <button className="btn"  onClick={handleSaveEdits}>{t('CNBtn')}</button> : <button className="btn" onClick={saveData}>{t('CNBtnTwo')}</button> } 
        </div>
      </div>














      <div className="bankContainer">
        <FormControl style={{ width: "350px" }}>
          <InputLabel id="bank-select-label">{t('CNSelect')}</InputLabel>
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

        <table className="bankTablemain">
          <thead></thead>
          <tbody className="bankTable">
            <tr>
              <td>{t('CNBDOne')}</td>
              <td>{selectedBank ? selectedBank.name : ""}</td>
            </tr>
            <tr>
              <td>{t('CNBDTwo')}</td>
              <td>{selectedBank ? selectedBank.accountNumber : ""}</td>
            </tr>
            <tr>
              <td>{t('CNBDThree')}</td>
              <td>{selectedBank ? selectedBank.branchName : ""}</td>
            </tr>
            <tr>
              <td>{t('CNBDFour')}</td>
              <td>{selectedBank ? selectedBank.branchNumber : ""}</td>
            </tr>
            <tr>
              <td>{t('CNBDFive')}</td>
              <td>{selectedBank ? selectedBank.accountType : ""}</td>
            </tr>
            <tr>
              <td>{t('CNBDOne')}</td>
              <td>{selectedBank ? selectedBank.transferDestination : ""}</td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    </>
  );
};

export default Bill;
