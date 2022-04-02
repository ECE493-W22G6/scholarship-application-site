import React from 'react';
import './SignUp.css';
import {useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
// import {isUserLoggedIn} from '../../model/LoginUtils';
// import Credentials from 'model/SignUp/Credentials';
// const Validator = require('validator');
// const isEmpty = require('is-empty');
const isEmpty = (string) => {
  return !string;
};

// Sign Up Page
const SignUp = () => {
  // logic that will prevent users from accessing the site without proper authentication
  // isUserLoggedIn().then((res) => {
  //     if (res.valueOf()){
  //         window.location.href = '/main';
  // }
  // }).catch(e => console.log(e))

  /**
   * States for username, email and password
   */
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const navigate = useNavigate();

  /**
   * The following will be called when user signs up with regular username and password
   * @param data
   */
  const handleSubmit = async () => {
    // Credentials.signUpRequest({username: username, email: email, password: password}).then(async (response) => {
    //   // const data = await response.json();
    //   if (response.ok) doneSignup();
    //   else window.alert('Some error in Signing Up!!');
    // }).catch(err => alert('something went wrong'));

  };
  /**
   * Callbacks for setting the username and passoword
   * @param event
   */
  const updateUsername = (event) => {
    setUsername(event.target.value);
  };
  const updateEmail = (event) => {
    setEmail(event.target.value);
  };
  const updatePassword = (event) => {
    setPassword(event.target.value);
  };
  const updatePassword2 = (event) => {
    setPassword2(event.target.value);
  };
  const doneSignup = () => {
    window.alert('You have successfully Signed Up. Please Sign In from the Sign In Page');
    navigate('/SignIn');
  };
  const validate = (event) => {
    event.preventDefault();
    const validate_username = !isEmpty(username) ? username : '';
    const validate_email = !isEmpty(email) ? email : '';
    const validate_password = !isEmpty(password) ? password : '';
    const validate_password2 = !isEmpty(password2) ? password2 : '';

    if (Validator.isEmpty(validate_username)) {
      window.alert('Username field is required');
      return false;
    } else if (Validator.isEmpty(validate_email)) {
      window.alert('Email field is required');
    } else if (!Validator.isEmail(validate_email)) {
      window.alert('Email is invalid');
    } else if (Validator.isEmpty(validate_password)) {
      window.alert('Password field is required');
    } else if (Validator.isEmpty(validate_password2)) {
      window.alert('Confirm password field is required');
    } else if (!Validator.isLength(validate_password, {min: 6, max: 30})) {
      window.alert('Password must be at least 6 characters');
    } else if (!Validator.equals(validate_password, validate_password2)) {
      window.alert('Passwords should match');
    } else {
      handleSubmit();
    }
  };

  return (
    <div className='signup-body'>
      <div id='card'>
        <div id='card-content'>
          <div id='card-title'>
            <h2>Scholarship App</h2>
            <div className='underline-title' />
          </div>
          <form onSubmit={validate} className='form'>
            <label htmlFor='user-username' style={{paddingTop: '13px'}}>Username</label>
            <input id='user-username' className='form-content' type='text' value={username}
              onChange={updateUsername} />
            <div className='form-border' />
            <label htmlFor='user-email' style={{paddingTop: '13px'}}>Email</label>
            <input id='user-email' className='form-content' type='text' value={email}
              onChange={updateEmail} />
            <div className='form-border' />
            <label htmlFor='user-password' style={{paddingTop: '22px'}}>Password</label>
            <input id='user-password' className='form-content'
              type='password' value={password} onChange={updatePassword} />
            <div className='form-border' />
            <label htmlFor='user-password2' style={{paddingTop: '22px'}}>Re-Enter Password</label>
            <input id='user-password2' className='form-content'
              type='password' value={password2} onChange={updatePassword2} />
            <div className='form-border' />
            <input type='submit' className='submit-btn-signup' value='Sign Up' />
          </form>
        </div>
      </div>
    </div>
  );
};


export default SignUp;
