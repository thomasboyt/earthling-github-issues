import React from 'react';
import {connect} from 'react-redux';
import Icon from 'react-fa';
import {Link} from 'react-router';
import TimeAgo from 'react-timeago';

import {getUserRepos} from '../actions/GithubActions';
import LoadingWrapper from './lib/LoadingWrapper';

import {getAsyncState} from 'redux-happy-async';

import {
  GET_USER_REPOS,
} from '../ActionTypes';

const RepoList = React.createClass({
  componentWillMount() {
    this.getRepos();
  },

  getRepos() {
    this.props.dispatch(getUserRepos(this.props.params.username));
  },

  renderRepoList() {
    const {user, repos} = this.props;

    return repos.map((repo) => (
      <li key={repo.name}>
        <ul className="repo-info">
          {repo.language && <li>{repo.language}</li>}
          <li><Icon name="star"/> {repo.stargazers_count}</li>
          <li><Icon name="code-fork"/> {repo.forks_count}</li>
          <li><Icon name="bug"/> {repo.open_issues_count}</li>
        </ul>

        <h3>
          <Link to={`/${user.login}/${repo.name}`}>{repo.name}</Link>
        </h3>

        {repo.description &&
          <p className="description">{repo.description}</p>
        }
        <p className="updated">Updated <TimeAgo date={repo.pushed_at}/></p>
      </li>
    )).toList().toJS();
  },

  render() {
    let {repos} = this.props;

    return (
      <LoadingWrapper loadingState={this.props.loadingState} onRetry={this.getRepos}
        isHydrated={!!repos}>
        {() => (
          <div>
            <ul className="user-repos">
              {this.renderRepoList()}
            </ul>
          </div>
        )}
      </LoadingWrapper>
    );
  }
});

function select(state, props) {
  const username = props.params.username;

  return {
    user: state.github.users.get(username),
    repos: state.github.reposByUser.get(username),
    loadingState: getAsyncState(state, GET_USER_REPOS, username),
  };
}

export default connect(select)(RepoList);
