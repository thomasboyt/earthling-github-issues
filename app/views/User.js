import React from 'react';
import {connect} from 'react-redux';
import Icon from 'react-fa';

import {getUser} from '../actions/GithubActions';
import LoadingWrapper from './lib/LoadingWrapper';

import {getAsyncState} from '../util/asyncReducer';

import {
  GET_USER,
} from '../ActionTypes';

const User = React.createClass({
  componentWillMount() {
    this.getUser();
  },

  getUser() {
    this.props.dispatch(getUser(this.props.params.username));
  },

  render() {
    const {user} = this.props;

    return (
      <LoadingWrapper loadingState={this.props.loadingState} onRetry={this.getUser}
        isHydrated={!!user}>
        {() => (
          <div>
            <div className="user-header">
              <img className="avatar" height="120" src={`${user.avatar_url}&s=240`} width="120"/>
              <h1>{user.name || user.login}</h1>
              <ul className="user-details">
                {user.company &&
                  <li>
                    <Icon name="briefcase"/>
                    {user.company}
                  </li>
                }

                {user.location &&
                  <li>
                    <Icon name="globe"/>
                    {user.location}
                  </li>
                }

                {user.blog &&
                  <li>
                    <Icon name="link"/>
                    <a href={user.blog} target="_blank">{user.blog}</a>
                  </li>
                }
              </ul>
              <ul className="user-tabs">
                <li className="active"><Icon name="book"/> Repositories <span className="badge">{user.public_repos}</span></li>
              </ul>
            </div>

            {this.props.children}
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
    loadingState: getAsyncState(state.github, GET_USER, username)
  };
}

export default connect(select)(User);
