import React from 'react'
import "./bill.css"
import { IoChevronDown } from "react-icons/io5";
import { FaPhoneVolume } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";




const Bill = () => {
  return (
    <>
      <div className='billHeader'>
        <p className='billHeading'> Your Bill</p>

        <div className='rightSection'>
          <div>
            <p>Date Of Issue</p>
            <p>11/05/2025</p>
          </div>
          <div>
            <p>Payment Deadline</p>
            <p>11/05/2025</p>
          </div>
        </div>
      </div>



      <div className='billSection'>
        <div>
          <div>
            <p className='billOneText'>To: Joy</p>
            <div className='billBoxOne'>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste perferendis ad consequuntur?</p>
            </div>
          </div>

          <div className='billDetail'>
            <p>Bill Amount</p>
            <p>Y</p>
            <p>18.00</p>
          </div>
        </div>
        <div>
          <p className='billOneText'>From: Takoemi</p>

          <div className='billBoxOne'>
            <p>Lorem, ipsum dolor.</p>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
            <p>102910290-231</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, exercitationem!</p>
            <p>120-123-123</p>
            <p>Registration</p>
            <p>number:T098776545423</p>
          </div>
        </div>
      </div>
<p style={{textAlign:"center", margin:"30px 0"}}>Thank You For Continue Support. We Would Like to make a request as folllow</p>



<div>
  <table className='table'>
    <thead>
    <tr className='tableHeading'>
      <th>Item</th>
      <th>Indivdual</th>
      <th>Money Order</th>
      <th>Amount of Money</th>
      <th>Sales tax rate</th>
      <th>Total</th>
    </tr>
    </thead>
    <tbody className='tableBody'>
    <tr>
      <td>Programming</td>
      <td></td>
      <td>10.99</td>
      <td>10%</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>C++</td>
      <td></td>
      <td>15.99</td>
      <td>15%</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>Tax rate OF 10%</td>
      <td>10.00</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>tax</td>
      <td>Y0.00</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>tax rate of 10%</td>
      <td>Y0.00</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>tax</td>
      <td>Y0.00</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>subtotal</td>
      <td>Y0.00</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>tax Free Contract</td>
      <td></td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>tabable</td>
      <td>Y0.00</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>Consumption tax</td>
      <td>Y.00</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td className='total'>Total Amount</td>
      <td className='total'>Y18.00</td>
    </tr>
    </tbody>
  </table>


  <div className='bankDetal'>
    <div>
      <p>Transfer Destination:</p>
      <p>Rakutin Bank:</p>
      <p>Rakutin Bank:</p>
      <p>Branck Name:</p>
      <p>Branck Number:</p>
      <p>Account Type:</p>
      <p>Account Number:</p>
      <p>Branch Number:</p>
      <p>Branch Name:</p>
      <p>Account Type:</p>
      <p>Account Number:</p>
    </div>
    <div>
      <p>J-wire CO,LTD. <IoChevronDown /> </p>
    </div>
  </div>
</div>


<div style={{height:"100px", width:"100%", border:"1px solid gray"}}></div>


<button className='billSave'>Save</button>


<div style={{height:"100px", width:"100%", background:"#189ce4", display:"flex", alignItems:"center" , padding:"0px 120px"}}>
<div style={{color:"white", fontSize:"20px" , marginRight:"40px"}}>
 <FaPhoneVolume /> +123456789
</div>

<div style={{color:"white", fontSize:"20px" , marginRight:"40px"}}>
<IoMdMail /> example@gmail.com
</div>
</div>
    </>
  )
}

export default Bill