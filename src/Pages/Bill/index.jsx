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
            <p>発行日</p>
            <p>11/05/2025</p>
          </div>
          <div>
            <p>お支払い期限</p>
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
            <p>御請求金額</p>
            <p>¥</p>
            <p>18.00</p>
          </div>
        </div>
        <div>
          <p className='billOneText'>From: Takoemi</p>

          <div className='billBoxOne'>
            <p>J-wire 株式会社</p>
            <p>代表取締役内山剛臣

〒432-8031</p>
            <p>102910290-231</p>
            <p>浜松市中区平田町108 平田ホワイトビル3F</p>
            <p>120-123-123</p>
            <p>Registration</p>
            <p>登録番号:T9080401021109</p>
          </div>
        </div>
      </div>
<p style={{textAlign:"center", margin:"30px 0"}}>Thank You For Continue Support. We Would Like to make a request as folllow</p>



<div>
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
      <td>小計</td>
      <td>Y0.00</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>非課税対照</td>
      <td></td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>非課税対照</td>
      <td>Y0.00</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>課税対象:</td>
      <td>Y.00</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td className='total'>合計金額</td>
      <td className='total'>Y18.00</td>
    </tr>
    </tbody>
  </table>


  <div className='bankDetal'>
    <div>
      <p>お振込先:</p>
      <p>楽天銀行:</p>
      <p>口座番号</p>
      <p>支店番号</p>
      <p>支店名：</p>
      <p>口座の種類:</p>
      <p>口座番号:</p>
      <p>口座番号</p>
      <p>口座番号:</p>
      <p>口座番号</p>
      <p>口座番号:</p>
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