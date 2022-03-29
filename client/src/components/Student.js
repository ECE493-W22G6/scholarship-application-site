import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './App.css';

import NotificationsNoneTwoToneIcon from '@mui/icons-material/NotificationsNoneTwoTone';


const Student = () => {
  const [name, setName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  return (
    <div className='Student'>
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
        <Link to="/notifications">Notifications
        
        </Link>

        <NotificationsNoneTwoToneIcon
          component={Link}
          to="/notifications">Notifications
          


        </NotificationsNoneTwoToneIcon>

        
      </nav>


    </div>
  );
};

export default Student;
