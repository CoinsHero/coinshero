import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import grey from 'material-ui/colors/grey';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import {Button} from 'material-ui';
import Menu, { MenuItem } from 'material-ui/Menu';
import T from 'i18n-react';

import {setTargetCurrencyInStore} from '../redux/actions/coinsApiActions';
import targetCurrencies, {setRegularTargetCurrencyLocalStorage} from '../helpers/targetCurrencies';

const styleSheet = createStyleSheet('TargetCurrencyMenu', (theme) => ({
  root: {
    direction: 'ltr'
  },
  root__Button: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    color: grey[50]
  },
  MenuItem__container: {
    display: 'flex',
    alignItems: 'center'
  }
}));

class TargetCurrencyMenu extends Component {
  constructor(props) {
    super();

    this.state = {
      anchorEl: undefined,
      open: false,
      targetCurrencyCode: props.targetCurrency.code
    };
  }

  _handleClick(event) {
    this.setState({ open: true, anchorEl: event.currentTarget});
  }

  _handleMenuItemClick(event, newTarget) {
    const currentTarget = targetCurrencies[this.state.targetCurrencyCode];

    if (currentTarget.code !== newTarget.code) {
      this.props.setTargetCurrencyInStore(this.props.locale, newTarget);
      setRegularTargetCurrencyLocalStorage(newTarget.code);
    }

    this.setState({ open: false, targetCurrencyCode: newTarget.code });
  }

  _handleRequestClose() {
    this.setState({ open: false });
  }

  _renderMenuItems() {
    return Object.values(targetCurrencies).map((currency, index) => {
      return (
        <MenuItem
          key={currency.code}
          selected={currency.code === this.state.targetCurrencyCode}
          onClick={(event) => this._handleMenuItemClick(event, currency)}>
          <div className={this.props.classes.MenuItem__container}>
            {T.translate(currency.translationKey)}
          </div>
        </MenuItem>
      );
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.targetCurrencyCode !== nextState.targetCurrencyCode ||
        this.state.open !== nextState.open ||
        this.props.isDarkTheme !== nextProps.isDarkTheme ||
      this.props.locale.code !== nextProps.locale.code;
  }

  render() {
    const ariaId = 'switch-target-currency';

    return (
      <div>
        <Button
          raised
          dense
          color="primary"
          className={this.props.classes.root__Button}
          aria-owns={ariaId}
          aria-haspopup="true"
          onClick={this._handleClick.bind(this)}>
          {T.translate(targetCurrencies[this.state.targetCurrencyCode].translationKey)}
        </Button>
        <Menu id={ariaId} anchorEl={this.state.anchorEl} open={this.state.open} onRequestClose={this._handleRequestClose.bind(this)}>
          {this._renderMenuItems()}
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isDarkTheme: state.site.isDarkTheme,
  targetCurrency: state.coins.targetCurrency,
  locale: state.site.locale
});

TargetCurrencyMenu.propTypes = {
  setTargetCurrencyInStore: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  locale: PropTypes.shape({
    code: PropTypes.string.isRequired,
    isRTL: PropTypes.bool
  }).isRequired,
  isDarkTheme: PropTypes.bool.isRequired,
  targetCurrency: PropTypes.shape({
    code: PropTypes.string.isRequired,
    translationKey: PropTypes.string.isRequired
  }).isRequired
};

export default connect(mapStateToProps, {setTargetCurrencyInStore} )(withStyles(styleSheet)(TargetCurrencyMenu));
