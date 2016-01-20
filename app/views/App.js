import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux'; 
import Icon from 'react-fa';

const App = React.createClass({
  render() {
    // TODO
    const loading = false;

    return (
      <div>
        <header>
          <Link to="/thomasboyt">
            <Icon name="github" className={loading ? 'loading' : ''}/>
          </Link>

          <a href="https://github.com/thomasboyt/eartling-github-issues" target="_blank" className="btn primary fork">
            <Icon name="code-fork"/> Fork Me on GitHub
          </a>
        </header>

        {this.props.children}
      </div>
    );
  }
});

export default connect()(App);
