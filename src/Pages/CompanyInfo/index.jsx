import React from 'react'
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
          <label>Company Name :</label>
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



          <div className='companytemplate'>
            <p className='BankingText'>Banking Detail</p>
            <div>
          <label>Company Name :</label>
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


          <div className='companytemplate'>
          
            <div>
          <label>Company Name :</label>
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


<div className='AddBtn'>
          <button> <AiOutlinePlusCircle style={{fontSize:"20px", fontWeight:"900"}} />Add More</button>
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