/* eslint-disable require-jsdoc */
import "./App.css";
import React from "react";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <nav className="App-header">
        <Link to="/signin">Login</Link> | <Link to="/signup">Register</Link> |{" "}
        <Link to="/student">Student</Link> |{" "}
        <Link to="/organization">Organization</Link>
        <Link to="/user/:id">user page</Link>
      </nav>
    </div>
  );
}

export default App;
