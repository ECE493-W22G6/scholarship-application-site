import React from 'react';
import {render} from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import App from './components/App';
import LandingPage from './components/LandingPage/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import Student from './components/Student';
import Organization from './components/Organization';
import Notifications from './components/Notifications';

// code referenced from https://stackoverflow.com/questions/41956465/how-to-create-multiple-page-app-using-react
// You can choose your kind of history here (e.g. browserHistory)
// import {Router, hashHistory as history} from 'react-router';
// Your routes.js file
// import routes from './routes';

const rootElement = document.getElementById('root');
render(
    <BrowserRouter>
      <Routes>
        <Route path="/all" element={<App/>}></Route>
        <Route path='/' element={<LandingPage />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/signIn' element={<SignIn />}></Route>
        <Route path='/signUp' element={<SignUp />}></Route>
        <Route path='/forgotPassword' element={<ForgotPassword />}></Route>
        <Route path='/resetPassword/:pathParam?' element={<ResetPassword />}></Route>
        <Route path="/student" element={<Student/>}></Route>
        <Route path="/organization" element={<Organization/>}></Route>
        {/* <Route path="/notifications" element={<Notifications/>}></Route> */}
    </Routes>

  </BrowserRouter>,
  rootElement,
);

// ReactDOM.render(
//     <Router routes={routes} history={history} />,
//     document.getElementById('root'),
// );
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
