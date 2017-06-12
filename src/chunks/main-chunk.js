import React from 'react';
import ReactDOM from 'react-dom';

import {Main} from '../components/Main';

const runMain = () => {
  ReactDOM.render(
    <Main />,
    document.getElementById('root')
  );
};

export default runMain;
