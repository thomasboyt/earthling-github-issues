import React from 'react';
import {connect} from 'react-redux';
import Icon from 'react-fa';
import {Link} from 'react-router';
import TimeAgo from 'react-timeago';

import {getIssues} from '../actions/GithubActions';
import LoadingWrapper from './lib/LoadingWrapper';

import {getAsyncState} from '../util/asyncReducer';

import {
  GET_ISSUES,
} from '../ActionTypes';

import {getRepoKey} from '../reducers/github';

const IssueList = React.createClass({
  componentWillMount() {
    this.getIssues();
  },

  getIssues() {
    const {username, reponame} = this.props.params;

    this.props.dispatch(getIssues(username, reponame));
  },

  renderIssues() {
    let {repo, issues} = this.props;

    return issues.map((issue) => (
      <li key={issue.number}>
        <Icon name="bug"/>
        <div className="comments"><Icon name="comment-o"/> {issue.comments}</div>
        <h3><Link to={`/${repo.owner.login}/${repo.name}/${issue.number}`}>{issue.title}</Link></h3>
        <p className="details">
          #{issue.number} opened <TimeAgo date={issue.created_at}/> by <Link to={`/${issue.user.login}`}>{issue.user.login}</Link>
        </p>
      </li>
    )).toList().toJS();
  },

  render() {
    let {issues} = this.props;

    return (
      <LoadingWrapper loadingState={this.props.loadingState} onRetry={this.getIssues}
        isHydrated={!!issues}>
        {() => (
          <ul className="repo-issues">
            {this.renderIssues()}
          </ul>
        )}
      </LoadingWrapper>
    );
  }
});

function select(state, props) {
  const {username, reponame} = props.params;

  return {
    repo: state.github.reposByUser.getIn([username, reponame]),
    issues: state.github.issuesByRepo.getIn([username, reponame]),
    loadingState: getAsyncState(state.github, GET_ISSUES, getRepoKey({username, reponame}))
  };
}

export default connect(select)(IssueList);
