import React from 'react';
import './ResetPassword.css';
import {useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
// import {isUserLoggedIn, printGoogleObject} from '../../model/LoginUtils';
// import ChangePassword from 'model/ChangePassword/ChangePassword';
const Validator = require('validator');
const isEmpty = require('is-empty');

// Reset Password Page
const ResetPassword = () => {
  //logic that will prevent users from accessing the site without proper authentication
  // isUserLoggedIn().then((res) => {
  //   if (res.valueOf()) {
  //     window.location.href = '/main';
  //  }
  //}).catch(e => console.log(e))

  /**
   * States for username, email and password
   */
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const navigate = useNavigate();

  /**
   * The following will be called upon validating password
   *
   */
  const handleSubmit = async () => {

    // var url = history.location.pathname;
    // var hash = url.substr(url.lastIndexOf('/') + 1);
    // console.log(password)
    // console.log(hash)

    // ChangePassword.resetPasswordRequest({password: password, hash: hash}).then(async (response) => {
    //   // const data = await response.json();
    //   console.log(response)
    //   if (response.ok) doneResetPassword();
    //   else window.alert('Some error in Resetting Password!!');
    //}).catch(err => alert('something went wrong'));
    doneResetPassword();
  }
  /**
   * Callbacks for setting the username and passoword
   * @param event
   */

  const updatePassword = (event) => {
    setPassword(event.target.value);
  }
  const updatePassword2 = (event) => {
    setPassword2(event.target.value);
  }
  const doneResetPassword = () => {
    window.alert('You have successfully Reset Password. You would have got an email regarding this.');
    navigate('/SignIn');
  }
  const validate = (event) => {
    event.preventDefault();
    var validate_password = !isEmpty(password) ? password : '';
    var validate_password2 = !isEmpty(password2) ? password2 : '';

    if (Validator.isEmpty(validate_password)) {
      window.alert('Password field is required');
    }
    else if (Validator.isEmpty(validate_password2)) {
      window.alert('Confirm password field is required');
    }
    else if (!Validator.isLength(validate_password, { min: 6, max: 30 })) {
      window.alert('Password must be at least 6 characters');
    }
    else if (!Validator.equals(validate_password, validate_password2)) {
      window.alert('Passwords should match');
    }
    else {
      handleSubmit();
    }

  }

  return (
    <div className='resetpassword-body'>
      <div id='card'>
        <div id='card-content'>
          <div id='card-title'>
            <h2>Scholarship App</h2>
            <div className='underline-title' />
          </div>
          <form onSubmit={validate} className='form'>
            <label htmlFor='user-password' style={{ paddingTop: '22px' }}>Password</label>
            <input id='user-password' className='form-content'
              type='password' value={password} onChange={updatePassword} />
            <div className='form-border' />
            <label htmlFor='user-password2' style={{ paddingTop: '22px' }}>Re-Enter Password</label>
            <input id='user-password2' className='form-content'
              type='password' value={password2} onChange={updatePassword2} />
            <div className='form-border' />
            <input type='submit' className='submit-btn-signup' value='Reset Password' />
          </form>
        </div>
      </div>
    </div>
  );
};



export default ResetPassword;
