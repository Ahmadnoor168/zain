import React, { useState } from 'react';
import "./email.css";
import Sidebar from '../../Components/Sidebar';

const EmailTemplate = () => {
  const [templates, setTemplates] = useState([{ id: 1, title: '', body: '' }]);

  const handleClick = () => {
    const newTemplate = { id: templates.length + 1, title: '', body: '' };
    setTemplates([...templates, newTemplate]);
  };

  const handleInputChange = (id, field, value) => {
    setTemplates(templates.map(template =>
      template.id === id ? { ...template, [field]: value } : template
    ));
  };

  const handleSave = () => {
    // Handle save logic here, e.g., send data to the server
    console.log("Templates saved:", templates);
  };

  return (
    <>
      <Sidebar />
      <div className='emailContainer'>
        <div className='detail'>
          <p>Email Template</p>
        </div>
        <button className='addClint' onClick={handleClick}>Add New Template</button>

        {templates.map(template => (
          <div key={template.id} className='emailtemplate'>
            <div>
              <label>Title</label>
              <input
                type='text'
                value={template.title}
                onChange={(e) => handleInputChange(template.id, 'title', e.target.value)}
              />
            </div>
            <div>
              <label>Body</label>
              <input
                type='text'
                value={template.body}
                onChange={(e) => handleInputChange(template.id, 'body', e.target.value)}
              />
            </div>
          </div>
        ))}
        <button className='saveBtn' onClick={handleSave}>Save</button>
      </div>
    </>
  );
};

export default EmailTemplate;
