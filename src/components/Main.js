import React, {Component} from 'react';
import T from 'i18n-react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import '../styles/components/_Main.scss';

class Main extends Component {
  render() {
    const cx = classnames(
      'Main',
      {'Main--rtl': this.props.isRTL}
    );

    return (
      <div className={cx}>
        <span>{T.translate('HELLO_WORLD')}</span>
      </div>
    );
  }
}

Main.propTypes = {
  isRTL: PropTypes.bool
};

export default Main;
