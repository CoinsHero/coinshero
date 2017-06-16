import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Site from '../components/Site';
import store from '../redux/store';

const runMain = () => {
  ReactDOM.render(
    <Provider store={ store }>
      <Site />
    </Provider>,
    document.getElementById('root')
  );
};

export default runMain;
