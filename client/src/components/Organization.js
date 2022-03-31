import React from 'react';
import {Link} from 'react-router-dom';
import './App.css';

const Organization = (props) => {
  return (
    <div className='Organization'>
      <nav>
        <Link to="/scholarshipList">All scholarships</Link> | {' '}
        <Link to="/notifications">Notifications</Link> | {' '}
        <Link to="/settings">Settings</Link>
      </nav>

    </div>
  );
};

export default Organization;
