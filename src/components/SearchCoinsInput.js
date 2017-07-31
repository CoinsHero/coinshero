import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {TextField} from 'material-ui';
import T from 'i18n-react';
import SearchIcon from 'material-ui-icons/Search';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import classnamesjss from '../helpers/classnamesjss';
import {debounce} from 'lodash';
import {CLIENT_SIDE_DEBOUNCE_DELAY} from '../helpers/consts';

const styleSheet = createStyleSheet((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.accent['A400']
  },
  root__SearchIcon: {
    marginRight: theme.spacing.unit * 1
  },
  'root--SearchIcon--dark-theme': {
    color: theme.palette.getContrastText(theme.palette.accent['A400'])
  },
  'root__SearchIcon--rtl': {
    marginLeft: theme.spacing.unit * 1
  }
}));

class SearchCoinsInput extends Component {
  render() {
    const cx = classnamesjss(this.props.classes,
      {root__SearchIcon: !this.props.isRTL},
      {'root__SearchIcon--rtl': this.props.isRTL},
      {'root--SearchIcon--dark-theme': this.props.isDarkTheme}
    );

    const debounceOnChange = debounce(this.props.onChange, CLIENT_SIDE_DEBOUNCE_DELAY);

    return (
      <div className={this.props.classes.root}>
        <SearchIcon className={cx} aria-label="Search for coins" />
        <TextField
          inputProps={{ autoFocus: this.props.autoFocus }}
          disabled={this.props.disabled}
          onChange={ (e) => debounceOnChange(e.target.value) }
          placeholder={T.translate('SEARCH_COINS_PLACEHOLDER')}
          type="search"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isDarkTheme: state.site.isDarkTheme
});

SearchCoinsInput.propTypes = {
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  isRTL: PropTypes.bool,
  isDarkTheme: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, null)(withStyles(styleSheet)(SearchCoinsInput));
