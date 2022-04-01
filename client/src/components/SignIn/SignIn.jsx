import React from 'react';
import './SignIn.css';
// import {refreshTokenSetup} from '../../model/refereshToken';
import {useNavigate} from 'react-router-dom';
// import {isUserLoggedIn, printGoogleObject} from '../../model/LoginUtils';
import {useState} from 'react';


// Sign In Page
const SignIn = () => {
  //logic that will prevent users from accessing the site without proper authentication
  // isUserLoggedIn().then((res) => {
  //     if (res.valueOf()){
  //         window.location.href = '/main';
  //   }
  //}).catch(e => console.log(e))

  /**
   * States for username and password
   */
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  /**
   * Handle the onSucess event from google auth
   * It will send the token to server and boot the user to main
   * @param res
   * @returns {Promise<void>}
   */
  const onSuccess = async (res) => {
    // const result = await fetch('/api/v1/auth/google', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     token: res.tokenId,
    // }),
    //   headers: {
    //     'Content-Type': 'application/json',
    // },
    //});
    // const data = await result.json();
    // // store returned user somehow
    // console.log('Database Data: ', data);
    // // console.log('Token ID: ', res.tokenId);
    // printGoogleObject(res);
    // refreshTokenSetup(res);
    // navigate('/main');
  };

  /**
   * If google auth fails to auth it will call this function
   * @param res
   */
  const onFailure = (res) => {
    console.log('Log in failed: ', res);
    alert('Log in failed');
  };

  /**
   * The following will be called when user signs in with regular username and password
   * @param data
   */
  const handleSubmit = (data) => {
    console.log('Form: ', data);
  };
  /**
   * Callbacks for setting the username and passoword
   * @param event
   */
  const updateUsername = (event) => {
    setUsername(event.target.value);
  };
  const updatePassword = (event) => {
    setPassword(event.target.value);
  };
  const toSignup = () => {
    navigate('/signUp');
  }
  const toForgotPassword = () => {
    navigate('/forgotPassword');
  }

  return (
    <div className='signin-body'>
      <div className='signin-container' id='card'>
        <div id='card-content'>
          <div id='card-title'>
            <h2>Scholarship App</h2>
            <div className='underline-title' />
          </div>
          <form onSubmit={handleSubmit} className='form'>
            <label htmlFor='user-email' style={{ paddingTop: '13px' }}>
              Email
            </label>
            <input
              id='user-email'
              className='form-content'
              type='text'
              value={username}
              onChange={updateUsername}
            />
            <div className='form-border' />
            <label htmlFor='user-password' style={{ paddingTop: '22px' }}>
              Password
            </label>
            <input
              id='user-password'
              className='form-content'
              type='password'
              value={password}
              onChange={updatePassword}
            />
            <div className='form-border' />
            <a href='#' id='forgotpassword' onClick={toForgotPassword}>
              <legend id='forgot-pass'>Forgot password?</legend>
            </a>
            <a href='#' id='signup' onClick={toSignup}>Don't have account yet?</a>
            <input type='submit' className='submit-btn' value='Sign In' />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
