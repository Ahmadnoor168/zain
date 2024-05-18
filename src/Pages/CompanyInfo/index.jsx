import {useState} from 'react'
import "./info.css"
import Sidebar from "../../Components/Sidebar"
import { AiOutlinePlusCircle } from "react-icons/ai";

const CompanyInfo = () => {


  return (
   <>
   <Sidebar />


   <div className='companyContainers'>
          <div className='detail'>
            <p>Company Information</p>
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