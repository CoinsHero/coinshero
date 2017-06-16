import React from 'react';
import ReactDOM from 'react-dom';
import {setLanguage, getLanguage, languages} from '../i18n';
import { Provider } from 'react-redux';

import Main from '../components/Main';
import store from '../redux/store';

const runMain = () => {
  // TODO: Take that from the URL / where ever is needed to handle it + LTR/RTL - https://github.com/kazazor/coinsmarket/issues/8
  // Setting the locale of the user
  setLanguage(languages.he.code);

  ReactDOM.render(
    <Provider store={ store }>
      <Main isRTL={getLanguage().isRTL}/>
    </Provider>,
    document.getElementById('root')
  );
};

export default runMain;
