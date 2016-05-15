import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/HomePage';
import FirstPage from './containers/FirstPage'; // eslint-disable-line import/no-named-as-default
import FindMatch from './containers/FindMatch';
import AboutPage from './components/AboutPage.js';
import NotFoundPage from './components/NotFoundPage.js';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="first-page" component={FirstPage}/>
    <Route path="find-match" component={FindMatch}/>
    <Route path="about" component={AboutPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
