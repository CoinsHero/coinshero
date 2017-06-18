import React, {Component} from 'react';
import classnamesjss from '../helpers/classnamesjss';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';

import NavigationHeader from './NavigationHeader';
import CoinsTable from './CoinsTable';
import Services from '../services/services';

const styleSheet = createStyleSheet('App', (theme) => ({
  'root': {
    direction: 'ltr'
  },
  'root--rtl': {
    direction: 'rtl'
  },
  'root__container': {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing.unit * 2.5,
    alignItems: 'center'
  }
}));

class App extends Component {
  render() {
    const classes = this.props.classes;
    const cx = classnamesjss(classes,
      'root',
      {'root--rtl': this.props.locale.isRTL}
    );

    return (
      <div className={cx}>
        <NavigationHeader locale={this.props.locale} />
        <div className={classes['root__container']}>
          <CoinsTable valuePairs={this.props.coinsData} />
        </div>
        <Services />
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  locale: PropTypes.shape({
    code: PropTypes.string,
    isRTL: PropTypes.bool
  }),
  coinsData: PropTypes.array
};

export default withStyles(styleSheet)(App);
