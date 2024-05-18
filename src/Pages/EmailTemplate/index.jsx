import React from 'react'
import "./email.css"
import Sidebar from '../../Components/Sidebar'

const EmailTemplate = () => {
  const handleClick = () => console.log("click");

  return (
    <>
      <Sidebar />

      <div className='emailContainer'>
        <div className='detail'>
          <p>Email Template</p>
        </div>
        <button className='addClint' onClick={handleClick}>Add New Template</button>


        <div className='emialtemplate'>
          <div>
            <label>Title</label>
            <input type='text' />

          </div>
          <div>
            <label>Body</label>
            <input type='text' />
          </div>
        </div>
        <button className='saveBtn'>Save</button>
      </div>
    </>
  )
}

export default EmailTemplate