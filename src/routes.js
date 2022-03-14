import React from 'react';
import {Route, IndexRoute} from 'react-router';

// code referenced from https://stackoverflow.com/questions/41956465/how-to-create-multiple-page-app-using-react
/**
 * Imort all page components here
 */
import App from './components/App';
import Login from './components/Login';

/**
 * All routes go here
 * Don't forget to import the components above after adding new route
 */
export default (
  <Route path="/" component={App}>
    <IndexRoute component={MainPage} />
    <Route path="/login" component={Login}/>
  </Route>
);
