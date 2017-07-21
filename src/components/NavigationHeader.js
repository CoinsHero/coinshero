import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {AppBar, Toolbar, Typography, IconButton} from 'material-ui';
import Tabs, { Tab } from 'material-ui/Tabs';
import T from 'i18n-react';
import LightbulbIcon from 'material-ui-icons/LightbulbOutline';
import MonetizationOn from 'material-ui-icons/MonetizationOn';
import { withTheme, withStyles, createStyleSheet } from 'material-ui/styles';
import {languages} from '../i18n';
import classnamesjss from '../helpers/classnamesjss';

import LanguageMenu from './LanguageMenu';

const styleSheet = createStyleSheet('NavigationHeader', (theme) => {
  const lightBackgroundColor = theme.palette.primary[300];
  const lightColor = theme.palette.common.black;
  const colorBackgroundDark = theme.palette.accent['A400'];
  const colorDark = theme.palette.getContrastText(colorBackgroundDark);

  return ({
    root: {
      backgroundColor: lightBackgroundColor,
      color: lightColor
    },
    'root--dark-theme': {
      'background-color': colorBackgroundDark,
      color: colorDark
    },
    root__appBar: {
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    root__appBar__title: {
      color: lightColor
    },
    'root__appBar__title--dark-theme': {
      color: colorDark
    },
    root__Tabs: {
      display: 'flex',
      flexGrow: 1
    },
    root_ToolBox: {
      padding: 0
    }
  });
});

class NavigationHeader extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.locale.code !== nextProps.locale.code || this.props.theme !== nextProps.theme;
  }

  render() {
    const isDark = this.props.theme.palette.type === 'dark';

    const cx = classnamesjss(this.props.classes,
      'root',
      {'root--dark-theme': isDark}
    );

    const cxTitle = classnamesjss(this.props.classes,
      'root__appBar__title',
      {'root__appBar__title--dark-theme': isDark}
    );

    let selectedLocaleIndex = 0;
    let locales = Object.values(languages);

    for (let index = 0; index < locales.length; index++) {
      if (locales[index].code === this.props.locale.code) {
        selectedLocaleIndex = index;
        break;
      }
    }

    const {classes} = this.props;

    return (
      <AppBar className={cx}>
        <div className={classes.root__appBar}>
          <Typography className={cxTitle} type="title">{T.translate('NAVIGATION_HEADER_TITLE')}</Typography>
          <Tabs onChange={() => {}} index={0} className={classes.root__Tabs}>
            <Tab icon={<MonetizationOn />} aria-label="Market" label={T.translate('TAB_MARKET')} />
          </Tabs>
          <Toolbar className={classes.root_ToolBox}>
            <LanguageMenu locales={locales} selectedIndex={selectedLocaleIndex} />
            <IconButton color="inherit" onClick={this.props.onThemeClick} aria-label="Toggle light/dark theme">
              <LightbulbIcon />
            </IconButton>
          </Toolbar>
        </div>
      </AppBar>
    );
  }
}

NavigationHeader.propTypes = {
  onThemeClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  locale: PropTypes.shape({
    code: PropTypes.string,
    isRTL: PropTypes.bool
  }).isRequired
};

export default withTheme(withStyles(styleSheet)(NavigationHeader));
