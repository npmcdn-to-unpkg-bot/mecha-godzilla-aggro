import React from 'react';
import {Router, Route, browseHistory} from 'react-router';
import App from './components/App';
import Reporter from './components/Reporter';

export default (
    <Route component={App}>
      <Route path='/(:env(/:team))' component={Reporter} />
    </Route>
)
