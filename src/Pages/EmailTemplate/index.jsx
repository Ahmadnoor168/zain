import React from 'react'
import "./email.css"
import Sidebar from '../../Components/Sidebar'

const EmailTemplate = () => {
  return (
    <>
      <Sidebar />

      <div className='emailContainer'>
        <div className='detail'>
          <p>Email Template</p>
        </div>


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