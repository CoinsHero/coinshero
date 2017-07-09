import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import Site from '../components/Site';
import store from '../redux/store';

const runMain = () => {
  ReactDOM.render(
    <Provider store={ store }>
      <Router history={ createBrowserHistory() }>
        <div>
          <Route exact path="/" component={ Site } />
          <Route exact path="/:lang" component={ Site } />
        </div>
      </Router>
    </Provider>,
    document.getElementById('root')
  );
};

export default runMain;
