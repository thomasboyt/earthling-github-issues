/*
 * Export your react-router routes here.
 */

import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from '../views/App';

export default (
  <Route path="/" component={App}>

    <Route
      path=":username"
      component={require('../views/User').default}>

      <IndexRoute component={require('../views/RepoList').default} />

      <Route path=":reponame" component={require('../views/Repo').default}>
        <IndexRoute component={require('../views/IssueList').default}/>
        <Route path=":issueNumber" component={require('../views/Issue').default}/>
      </Route>

    </Route>

  </Route>
);
