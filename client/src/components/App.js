/* eslint-disable require-jsdoc */
import "./App.css";
import React from "react";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <nav className="App-header">
        <Link to="/login">Login</Link> | <Link to="/register">Register</Link> |{" "}
        <Link to="/signIn">Sign In</Link> | <Link to="/signUp">Sign Up</Link> |{" "}
        {/* <Link to="/forgotPassword">Forgot Password</Link> | {' '}
        <Link to="/resetPassword/:pathParam?">Reset Password</Link> */}
        <Link to="/student">Student</Link> |{" "}
        <Link to="/organization">Organization</Link>
      </nav>
    </div>
  );
}

export default App;
