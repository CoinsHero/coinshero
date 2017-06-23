import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import T from 'i18n-react';

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
    // TODO: Dispatch redux set locale change
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
        this.state.open !== nextState.open;
  }

  render() {
    console.log('LanguageMenu');
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

LanguageMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  locales: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    svgId: PropTypes.string.isRequired,
    translationKey: PropTypes.string.isRequired
  })).isRequired,
  selectedIndex: PropTypes.number.isRequired
};

export default withStyles(styleSheet)(LanguageMenu);
