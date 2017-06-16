import React from 'react';
import ReactDOM from 'react-dom';

import Site from '../components/Site';

const runMain = () => {
  ReactDOM.render(
    <Site />,
    document.getElementById('root')
  );
};

export default runMain;
