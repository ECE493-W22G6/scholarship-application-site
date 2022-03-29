import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './App.css';

const Organization = () => {
  const [name, setName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  return (
    <div className='Organization'>
      <form>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type='file'
          value={selectedFile}
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
      </form>
      <nav>
        <Link to="/scholarshipList">ScholarshipList</Link> | {' '}
        <Link to="/settings">Settings</Link> | {' '}
        <Link to="/notifications">Notifications</Link>
      </nav>
    </div>
  );
};

export default Organization;