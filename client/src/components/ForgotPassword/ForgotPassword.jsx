import React from 'react';
import './ForgotPassword.css';
import {useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
// import {isUserLoggedIn} from '../../model/LoginUtils';
// import ChangePassword from 'model/ChangePassword/ChangePassword';
const Validator = require('validator');
const isEmpty = require('is-empty');

// Forget Paassword Page
const ForgotPassword = () => {
  //logic that will prevent users from accessing the site without proper authentication
  // isUserLoggedIn().then((res) => {
  //   if (res.valueOf()) {
  //     window.location.href = '/main';
  //   }
  // }).catch(e => console.log(e));

  /**
   * States for username, email and password
   */
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  /**
   * The following will be called after validating email
   */
  const handleSubmit = async (data) => {
    // ChangePassword.forgotPasswordRequest({email: email}).then(async (response) => {
    //   // const data = await response.json();
    //   if (response.ok) doneForgotPassword();
    //   else window.alert('Some error in action!!');
    //}).catch(err => alert('something went wrong'));
    doneForgotPassword();
  };
  /**
   * Callbacks for setting the username and passoword
   * @param event
   */

  const updateEmail = (event) => {
    setEmail(event.target.value);
  };
  const doneForgotPassword = () => {
    window.alert('Please reset your Password by clicking on the link sent to your email.');
    navigate('/ForgotPassword');
  };
  const validate = (event) => {
    event.preventDefault();
    var validate_email = !isEmpty(email) ? email : '';
    if (Validator.isEmpty(validate_email)) {
      window.alert('Email field is required');
    }
    else if (!Validator.isEmail(validate_email)) {
      window.alert('Email is invalid');
    }
    else {
      handleSubmit();
    }

  };

  return (
    <div className='forgotpassword-body'>
      <div id='card'>
        <div id='card-content'>
          <div id='card-title'>
            <h2>Scholarship App</h2>
            <div className='underline-title' />
          </div>
          <form onSubmit={validate} className='form'>
            <label htmlFor='user-email' style={{ paddingTop: '13px' }}>Email</label>
            <input id='user-email' className='form-content' type='text' value={email}
              onChange={updateEmail} />
            <div className='form-border' />
            <input type='submit' className='submit-btn-signup' value='Forget Password' />
          </form>
        </div>
      </div>
    </div>
  );
};



export default ForgotPassword;
