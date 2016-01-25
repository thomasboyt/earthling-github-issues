import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import TimeAgo from 'react-timeago';

import {getIssue, getIssueKey} from '../../actions/GithubActions';
import LoadingWrapper from '../lib/LoadingWrapper';
import IssueCommentsList from './IssueCommentsList';

import {getAsyncState} from 'redux-happy-async';

import {
  GET_ISSUE,
} from '../../ActionTypes';

const Issue = React.createClass({
  componentWillMount() {
    this.getIssue();
  },

  getIssue() {
    const {username, reponame, issueNumber} = this.props.params;

    this.props.dispatch(getIssue(username, reponame, issueNumber));
  },

  render() {
    const {issue} = this.props;

    return (
      <LoadingWrapper loadingState={this.props.loadingState} onRetry={this.getIssue}
        isHydrated={!!issue}>
        {() => (
          <div>
            <div className="issue-header">
              <h2>{issue.title} <span className="number">#{issue.number}</span></h2>
              <p className="details">
                <span className="user">
                  <Link to={`/${issue.user.login}`}>{issue.user.login}</Link>
                </span> opened
                this issue <TimeAgo date={issue.created_at}/>
              </p>
            </div>

            <IssueCommentsList issue={issue} {...this.props.params} />
          </div>
        )}
      </LoadingWrapper>
    );
  }
});

function select(state, props) {
  const {username, reponame, issueNumber} = props.params;

  return {
    issue: state.github.issuesByRepo.getIn([username, reponame, issueNumber]),
    loadingState: getAsyncState(state, GET_ISSUE, getIssueKey({username, reponame, issueNumber}))
  };
}

export default connect(select)(Issue);
