import React from 'react';
import {render} from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import App from './components/App';
import Login from './components/Login';
import Register from './components/Register';
import Student from './components/Student';
import Organization from './components/Organization';

// code referenced from https://stackoverflow.com/questions/41956465/how-to-create-multiple-page-app-using-react
// You can choose your kind of history here (e.g. browserHistory)
// import {Router, hashHistory as history} from 'react-router';
// Your routes.js file
// import routes from './routes';

const rootElement = document.getElementById('root');
render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/student" element={<Student/>}></Route>
        <Route path="/organization" element={<Organization/>}></Route>
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
