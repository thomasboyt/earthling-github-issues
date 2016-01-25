import createImmutableReducer from '../util/immutableReducer';

import I from 'immutable';

import {
  GET_USER,
  GET_USER_REPOS,
  GET_REPO,
  GET_ISSUES,
  GET_ISSUE,
  GET_COMMENTS,
} from '../ActionTypes';

const State = I.Record({
  users: I.Map(),
  reposByUser: I.Map(),
  issuesByRepo: I.Map(),
  commentsByIssue: I.Map(),
});

const initialState = new State();

const githubReducer = createImmutableReducer(initialState, {
  [GET_USER]: ({resp, username}, state) => {
    return state.setIn(['users', username], resp);
  },

  [GET_USER_REPOS]: ({resp, username}, state) => {
    const kvPairs = resp.map((repo) => [repo.name, repo]);
    return state.setIn(['reposByUser', username], I.OrderedMap(kvPairs));
  },

  [GET_REPO]: ({resp, username}, state) => {
    return state.setIn(['reposByUser', username, resp.name], resp);
  },

  [GET_ISSUES]: ({resp, username, reponame}, state) => {
    const kvPairs = resp.map((issue) => [issue.id, issue]);
    return state.setIn(['issuesByRepo', username, reponame], I.OrderedMap(kvPairs));
  },

  [GET_ISSUE]: ({resp, username, reponame, issueNumber}, state) => {
    return state.setIn(['issuesByRepo', username, reponame, issueNumber], resp);
  },

  [GET_COMMENTS]: ({resp, username, reponame, issueNumber}, state) => {
    return state.setIn(['commentsByIssue', username, reponame, issueNumber], resp);
  },
});

export default githubReducer;
