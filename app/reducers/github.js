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

import createAsyncReducer from '../util/asyncReducer';

const State = I.Record({
  async: I.Map(),

  users: I.Map(),
  reposByUser: I.Map(),
  issuesByRepo: I.Map(),
  commentsByIssue: I.Map(),
});

const initialState = new State();

export function getRepoKey({username, reponame}) {
  return [username, reponame].join('/');
}

export function getIssueKey({username, reponame, issueNumber}) {
  return [getRepoKey({username, reponame}), issueNumber].join('#');
}

const githubReducer = createImmutableReducer(initialState, {
  ...createAsyncReducer({
    type: GET_USER,

    uniqueKey: 'username',

    onSuccess: ({resp, username}, state) => {
      return state.setIn(['users', username], resp);
    }
  }),

  ...createAsyncReducer({
    type: GET_USER_REPOS,

    uniqueKey: 'username',

    onSuccess: ({resp, username}, state) => {
      const kvPairs = resp.map((repo) => [repo.name, repo]);
      return state.setIn(['reposByUser', username], I.OrderedMap(kvPairs));
    }
  }),

  ...createAsyncReducer({
    type: GET_REPO,

    uniqueKey: getRepoKey,

    onSuccess: ({resp, username}, state) => {
      return state.setIn(['reposByUser', username, resp.name], resp);
    }
  }),

  ...createAsyncReducer({
    type: GET_ISSUES,

    uniqueKey: getRepoKey,

    onSuccess: ({resp, username, reponame}, state) => {
      const kvPairs = resp.map((issue) => [issue.id, issue]);
      return state.setIn(['issuesByRepo', username, reponame], I.OrderedMap(kvPairs));
    }
  }),

  ...createAsyncReducer({
    type: GET_ISSUE,

    uniqueKey: getIssueKey,

    onSuccess: ({resp, username, reponame, issueNumber}, state) => {
      return state.setIn(['issuesByRepo', username, reponame, issueNumber], resp);
    }
  }),

  ...createAsyncReducer({
    type: GET_COMMENTS,

    uniqueKey: getIssueKey,

    onSuccess: ({resp, username, reponame, issueNumber}, state) => {
      return state.setIn(['commentsByIssue', username, reponame, issueNumber], resp);
    }
  }),
});

export default githubReducer;
