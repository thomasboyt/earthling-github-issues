import React from 'react';
import {connect} from 'react-redux'; 
import Icon from 'react-fa';

const App = React.createClass({
  render() {
    // TODO
    const loading = false;

    return (
      <div>
        <header>
          <a href="https://github.com/insin/nwb" target="_blank">
            <Icon name="github" className={loading ? 'loading' : ''}/>
          </a>

          <a href="https://github.com/insin/react-nwb-github-issues" target="_blank" className="btn primary fork">
            <Icon name="code-fork"/> Fork Me on GitHub
          </a>
        </header>

        {this.props.children}
      </div>
    );
  }
});

export default connect()(App);
