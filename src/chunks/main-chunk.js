import React from 'react';
import ReactDOM from 'react-dom';
import config from 'config';

import { Main } from '../components/Main';

const runMain = () => {
  ReactDOM.render(
    <Main />,
    document.getElementById('root')
  );
};

export default runMain;
