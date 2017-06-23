import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import {Button} from 'material-ui';
import Menu, { MenuItem } from 'material-ui/Menu';
import T from 'i18n-react';
import {setLanguage} from '../i18n';

import {setLocaleInStore} from '../redux/actions/bootstrapActions';

const styleSheet = createStyleSheet('LanguageMenu', (theme) => ({
  'root': {
    direction: 'ltr'
  },
  'root__Button': {
    textTransform: 'none'
  },
  'MenuItem__container': {
    display: 'flex',
    alignItems: 'center'
  }
}));

class LanguageMenu extends Component {
  constructor(props) {
    super();

    this.state = {
      anchorEl: undefined,
      open: false,
      selectedIndex: props.selectedIndex
    };
  }

  _handleClick(event) {
    this.setState({ open: true, anchorEl: event.currentTarget});
  }

  _handleMenuItemClick(event, index) {
    const currentLocaleCode = this.props.locales[this.state.selectedIndex].code;
    const newLocale = this.props.locales[index];

    if (currentLocaleCode !== newLocale.code) {
      setLanguage(newLocale.code);
      this.props.setLocaleInStore(newLocale);
    }

    this.setState({ open: false, selectedIndex: index });
  }

  _handleRequestClose() {
    this.setState({ open: false });
  }

  _renderMenuItems() {
    // TODO: Put icon here!!!!
    return this.props.locales.map((locale, index) => {
      return (
        <MenuItem
          key={locale.code}
          selected={index === this.state.selectedIndex}
          onClick={(event) => this._handleMenuItemClick.call(this, event, index)}>
          <div className={this.props.classes.MenuItem__container}>
            {T.translate(locale.translationKey)}
          </div>
        </MenuItem>
      );
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({selectedIndex: nextProps.selectedIndex});
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.selectedIndex !== nextState.selectedIndex ||
        this.state.open !== nextState.open ||
        this.props.isDarkTheme !== nextProps.isDarkTheme;
  }

  render() {
    const ariaId = 'switch-languages';

    return (
      <div>
        <Button className={this.props.classes.root__Button} aria-owns={ariaId} aria-haspopup="true" onClick={this._handleClick.bind(this)}>
          {T.translate(this.props.locales[this.state.selectedIndex].translationKey)}
        </Button>
        <Menu id={ariaId} anchorEl={this.state.anchorEl} open={this.state.open} onRequestClose={this._handleRequestClose.bind(this)}>
          {this._renderMenuItems()}
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isDarkTheme: state.site.isDarkTheme
});

LanguageMenu.propTypes = {
  setLocaleInStore: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  locales: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    svgId: PropTypes.string.isRequired,
    translationKey: PropTypes.string.isRequired
  })).isRequired,
  selectedIndex: PropTypes.number.isRequired,
  isDarkTheme: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, {setLocaleInStore} )(withStyles(styleSheet)(LanguageMenu));
