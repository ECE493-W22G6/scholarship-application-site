import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './App.css';
// import getter from '../util';

// import useSWR from 'swr';

const Organization = (props) => {
  const [userData, setUserData] = useState();
  // const {data, error} = useSWR('/api/users/62463e3ebd256454fbdc71fb', getter)
  useEffect(() => {
    fetch('/api/users/62463e3ebd256454fbdc71fb', {
      'methods': 'GET',
    }).then((res) => {
      console.log(res);
      return res.json();
    })
        .then((data) => {
          console.log(data);
          setUserData(data);
        });
  });
  let userDataDiv;

  if (userData) {
    userDataDiv = <div>
      <div>
        <div align="left">
          <img src={userData.icon_url}/>
        </div>
        {userData.first_name}
      </div>
      <div>
        {userData.description}
      </div>
    </div>;
  } else {
    userDataDiv = <div>
      Loading...
    </div>;
  }

  return (
    <div className='Organization'>
      <nav>
        <Link to="/scholarshipList">All scholarships</Link> | {' '}
        <Link to="/notifications">Notifications</Link> | {' '}
        <Link to="/settings">Settings</Link>
      </nav>
      {userDataDiv}
    </div>
  );
};

export default Organization;
