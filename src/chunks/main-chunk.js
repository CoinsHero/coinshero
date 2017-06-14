import React from 'react';
import ReactDOM from 'react-dom';
import {setLanguage, getLanguage, languages} from '../i18n';

import Main from '../components/Main';

const runMain = () => {
  // TODO: Take that from the URL / where ever is needed to handle it + LTR/RTL - https://github.com/kazazor/coinsmarket/issues/8
  // Setting the locale of the user
  setLanguage(languages.he.code);

  ReactDOM.render(
    <Main isRTL={getLanguage().isRTL}/>,
    document.getElementById('root')
  );
};

export default runMain;
