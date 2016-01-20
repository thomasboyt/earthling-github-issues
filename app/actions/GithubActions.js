import {
  GET_USER,
  GET_USER_REPOS,
  GET_REPO,
  GET_ISSUES,
  GET_ISSUE,
  GET_COMMENTS,
} from '../ActionTypes';

import getJson from '../util/getJson';

export function getUser(username) {
  return async function(dispatch) {
    await getJson(`https://api.github.com/users/${username}`, {
      dispatch,
      type: GET_USER,
      payload: {username},
    });
  };
}

export function getUserRepos(username) {
  return async function(dispatch) {
    const url =`https://api.github.com/users/${username}/repos?sort=pushed&direction=desc&per_page=100`;

    await getJson(url, {
      dispatch,
      type: GET_USER_REPOS,
      payload: {username},
    });
  };
}

export function getRepo(username, reponame) {
  return async function(dispatch) {
    const url = `https://api.github.com/repos/${username}/${reponame}`;

    await getJson(url, {
      dispatch,
      type: GET_REPO,
      payload: {username, reponame},
    });
  };
}

export function getIssues(username, reponame) {
  return async function(dispatch) {
    const url = `https://api.github.com/repos/${username}/${reponame}/issues?per_page=100`;

    await getJson(url, {
      dispatch,
      type: GET_ISSUES,
      payload: {username, reponame},
    });
  };
}

export function getIssue(username, reponame, issueNumber) {
  return async function(dispatch) {
    const url = `https://api.github.com/repos/${username}/${reponame}/issues/${issueNumber}`;

    await getJson(url, {
      dispatch,
      type: GET_ISSUE,
      payload: {username, reponame, issueNumber},
    });
  };
}

export function getComments(username, reponame, issueNumber) {
  return async function(dispatch) {
    const url = `https://api.github.com/repos/${username}/${reponame}/issues/${issueNumber}/comments`;

    await getJson(url, {
      dispatch,
      type: GET_COMMENTS,
      payload: {username, reponame, issueNumber},
    });
  };
}
