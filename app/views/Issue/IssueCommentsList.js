import React from 'react';
import {connect} from 'react-redux';

import {getComments} from '../../actions/GithubActions';
import LoadingWrapper from '../lib/LoadingWrapper';
import IssueComment from './IssueComment';

import {getAsyncState} from 'redux-happy-async';

import {
  GET_COMMENTS,
} from '../../ActionTypes';

import {getIssueKey} from '../../reducers/github';

const IssueCommentsList = React.createClass({
  propTypes: {
    issue: React.PropTypes.object.isRequired,
    username: React.PropTypes.string.isRequired,
    reponame: React.PropTypes.string.isRequired,
    issueNumber: React.PropTypes.string.isRequired,
  },

  componentWillMount() {
    this.getComments();
  },

  getComments() {
    const {username, reponame, issueNumber} = this.props;

    this.props.dispatch(getComments(username, reponame, issueNumber));
  },

  renderCommentsList() {
    const {comments} = this.props;

    return comments.map((comment) => (
      <IssueComment key={comment.id} comment={comment}/>
    ));
  },

  render() {
    const {issue, comments} = this.props;

    return (
      <LoadingWrapper loadingState={this.props.loadingState} onRetry={this.getComments}
        isHydrated={!!comments}>
        {() => (
          <div className="issue-comments">
            <IssueComment comment={issue}/>
            {this.renderCommentsList()}
          </div>
        )}
      </LoadingWrapper>
    );
  }
});

function select(state, props) {
  const {username, reponame, issueNumber} = props;

  return {
    comments: state.github.commentsByIssue.getIn([username, reponame, issueNumber]),
    loadingState: getAsyncState(state.github, GET_COMMENTS, getIssueKey({username, reponame, issueNumber}))
  };
}

export default connect(select)(IssueCommentsList);
