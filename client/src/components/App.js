/* eslint-disable require-jsdoc */
import './App.css';
import React from 'react';
import {Link} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <nav
        className='App-header'>
        <Link to="/login">Login</Link> | {' '}
        <Link to="/register">Register</Link>
      </nav>
    </div>
  );
}

export default App;
