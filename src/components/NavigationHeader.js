import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {AppBar, Toolbar, Typography, IconButton} from 'material-ui';
import Tabs, { Tab } from 'material-ui/Tabs';
import T from 'i18n-react';
import LightbulbIcon from 'material-ui-icons/LightbulbOutline';
import MonetizationOn from 'material-ui-icons/MonetizationOn';
import { withTheme, withStyles, createStyleSheet } from 'material-ui/styles';
import classnamesjss from '../helpers/classnamesjss';
import SearchCoinsInput from './SearchCoinsInput';

const styleSheet = createStyleSheet('NavigationHeader', (theme) => ({
  'root': {
    'background-color': theme.palette.primary[600],
    'color': theme.palette.getContrastText(theme.palette.primary[500]),
    'position': 'fixed',
    'top': '0px'
  },
  'root--dark': {
    'background-color': theme.palette.accent['A400'],
    'color': theme.palette.getContrastText(theme.palette.accent['A400'])
  },
  'root__tabs': {
    display: 'flex',
    flexGrow: 1
  }
}));

class NavigationHeader extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.showSearch !== nextProps.showSearch ||
      this.props.disableSearch !== nextProps.disableSearch ||
      this.props.locale.code !== nextProps.locale.code ||
      this.props.theme !== nextProps.theme;
  }

  render() {
    const cx = classnamesjss(this.props.classes,
      'root',
      {'root--dark': this.props.theme.palette.type === 'dark'}
    );

    return (
      <AppBar className={cx}>
        <Toolbar>
          <Typography type="title">{T.translate('NAVIGATION_HEADER_TITLE')}</Typography>
          <Tabs onChange={() => {}} index={0} className={this.props.classes['root__tabs']}>
            <Tab icon={<MonetizationOn />} aria-label="Market" label={T.translate('TAB_MARKET')} />
          </Tabs>
          {this.props.showSearch && <SearchCoinsInput disabled={this.props.disableSearch}
            isRTL={this.props.locale.isRTL}
            onChange={this.props.onSearchChange} />}
          <IconButton color="inherit" onClick={this.props.onThemeClick} aria-label="Toggle light/dark theme">
            <LightbulbIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}

NavigationHeader.propTypes = {
  disableSearch: PropTypes.bool,
  showSearch: PropTypes.bool,
  onSearchChange: PropTypes.func.isRequired,
  onThemeClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  locale: PropTypes.shape({
    code: PropTypes.string,
    isRTL: PropTypes.bool
  }).isRequired
};

export default withTheme(withStyles(styleSheet)(NavigationHeader));
