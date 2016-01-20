import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import Icon from 'react-fa';

import {getRepo} from '../actions/GithubActions';
import LoadingWrapper from './lib/LoadingWrapper';

import {getAsyncState} from 'redux-happy-async';

import {
  GET_REPO,
} from '../ActionTypes';

import {getRepoKey} from '../reducers/github';

const Repo = React.createClass({
  componentWillMount() {
    this.getRepo();
  },

  getRepo() {
    const {username, reponame} = this.props.params;

    this.props.dispatch(getRepo(username, reponame));
  },

  render() {
    let {repo} = this.props;

    return (
      <LoadingWrapper loadingState={this.props.loadingState} onRetry={this.getRepo}
        isHydrated={!!repo}>
        {() => (
          <div>
            <div className="repo-header">
              <h1>
                <Icon name="book"/>
                {' '}
                <span className="user">
                  <Link to={`/${repo.owner.login}`}>{repo.owner.login}</Link>
                </span>
                {' / '}
                <span className="repo">
                  <Link to={`/${repo.owner.login}/${repo.name}`}>{repo.name}</Link>
                </span>
              </h1>
            </div>

            {this.props.children}
          </div>
        )}
      </LoadingWrapper>
    );
  }
});

function select(state, props) {
  const {username, reponame} = props.params;

  return {
    repo: state.github.reposByUser.getIn([username, reponame]),
    loadingState: getAsyncState(state.github, GET_REPO, getRepoKey({username, reponame}))
  };
}

export default connect(select)(Repo);
