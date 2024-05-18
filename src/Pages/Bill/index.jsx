import React from "react";
import "./bill.css"
import { IoChevronDown } from "react-icons/io5";
import { FaPhoneVolume } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";




const Bill = () => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
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


      <div style={{textAlign:"right", marginTop:"20px", marginRight:"40px"}}>
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