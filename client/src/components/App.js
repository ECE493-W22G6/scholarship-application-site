/* eslint-disable require-jsdoc */
import './App.css';
import React from 'react';
import {Link} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <nav
        style={{borderBottom: 'solid 1px', paddingBottom: '1rem'}}>
        <Link to="/login">Login</Link> | {' '}
        <Link to="/register">Register</Link>
      </nav>
    </div>
  );
}

export default App;
