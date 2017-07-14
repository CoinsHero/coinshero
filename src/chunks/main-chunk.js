import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import * as Navigator from '../helpers/navigator';
import withGATracker from '../components/withGATracker';
import Site from '../components/Site';
import store from '../redux/store';

const runMain = () => {
  ReactDOM.render(
    <Provider store={ store }>
      <Router history={createBrowserHistory()} >
        <div>
          <Route exact path={ Navigator.defaultRoute() } component={ withGATracker(Site) } />
          <Route exact path={ Navigator.languageRoute() } component={ withGATracker(Site) } />
        </div>
      </Router>
    </Provider>,
    document.getElementById('root')
  );
};

export default runMain;
