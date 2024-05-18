import {useState} from 'react'
import "./info.css"
import Sidebar from "../../Components/Sidebar"
import { AiOutlinePlusCircle } from "react-icons/ai";

const CompanyInfo = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
   <>
   <Sidebar />


   <div className='companyContainers'>
          <div className='detail'>
            <p>Company Information</p>
          </div>


          <div style={{textAlign:"right", marginBottom:"20px"}}>
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
            style={{color:"wheat"}}
          />
        </svg>
      </span>
    </button>
    </div>












          <div className='companytemplate'>
            <div>
          <label>Company Name:</label>
           <input /> 
          </div>
          <div>
          <label>Address :</label>
           <input /> 
          </div>
          <div>
          <label>Email Address :</label>
           <input /> 
          </div>
          <div>
          <label>Banking Detail :</label>
           <input /> 
          </div>

          </div>


<div className='bankingContainer'>
          <div className='Bankingtemplate '  >


            <p className='BankingText'>Banking Detail</p>

            <div>
            <div>
          <label>お振込先:</label>
           <input /> 
          </div>
          <div>
          <label>名義:</label>
           <input /> 
          </div>
          <div>
          <label>支店番号:</label>
           <input /> 
          </div>
          <div>
          <label>支店名:</label>
           <input /> 
          </div>
          <div>
          <label>口座の種類:</label>
           <input /> 
          </div>
          <div>
          <label>口座番号:</label>
           <input /> 
          </div>
          </div>

          </div>


          <div className='Bankingtemplate ' style={{paddingTop:"20px"}}  >

<div>
<div>
<label>お振込先:</label>
<input /> 
</div>
<div>
<label>名義:</label>
<input /> 
</div>
<div>
<label>支店番号:</label>
<input /> 
</div>
<div>
<label>支店名:</label>
<input /> 
</div>
<div>
<label>口座の種類:</label>
<input /> 
</div>
<div>
<label>口座番号:</label>
<input /> 
</div>
</div>

</div>
</div>

<div className='AddBtn' onClick={()=>alert("Add More")}>
          <button> <AiOutlinePlusCircle style={{fontSize:"20px", fontWeight:"900"}}  />Add More</button>
          </div>




          
          <div className='companytemplate'>
          
            <div>
          <label>Tax Registration No. :</label>
           <input /> 
          </div>
          <div>
          <label>Upload Image :</label>
           <input type='file' /> 
          </div>


          </div>

          <div className='AddBtn'>
          <button>Update</button>
          </div>

          </div>
   </>
  )
}

export default CompanyInfo