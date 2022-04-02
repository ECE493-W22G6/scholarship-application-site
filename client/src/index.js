import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./components/App";
import Organization from "./components/Organization";
import Student from "./components/Student";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import "./index.css";

// code referenced from https://stackoverflow.com/questions/41956465/how-to-create-multiple-page-app-using-react
// You can choose your kind of history here (e.g. browserHistory)
// import {Router, hashHistory as history} from 'react-router';
// Your routes.js file
// import routes from './routes';

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/student" element={<Student />}></Route>
      <Route path="/organization" element={<Organization />}></Route>
      {/* <Route path="/notifications" element={<Notifications/>}></Route> */}
    </Routes>
  </BrowserRouter>,
  rootElement
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

// export default (
//   <Route path="/" component={App}>
//     <Route path="/login" component={Login}/>
//   </Route>
// );
