import React from 'react';
import PropTypes from 'prop-types';
import {TextField} from 'material-ui';
import T from 'i18n-react';
import SearchIcon from 'material-ui-icons/Search';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import classnamesjss from '../helpers/classnamesjss';
import {debounce} from 'lodash';
import {CLIENT_SIDE_DEBOUNCE_DELAY} from '../helpers/consts';

const styleSheet = createStyleSheet('SearchCoinsInput', (theme) => ({
  'root': {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.getContrastText(theme.palette.accent['A400'])
  },
  'root__SearchIcon': {
    marginRight: theme.spacing.unit * 1
  },
  'root__SearchIcon--rtl': {
    marginLeft: theme.spacing.unit * 1
  }
}));

const SearchCoinsInput = (props) => {
  const cx = classnamesjss(props.classes,
    {'root__SearchIcon': !props.isRTL},
    {'root__SearchIcon--rtl': props.isRTL}
  );

  const debounceOnChange = debounce(props.onChange, CLIENT_SIDE_DEBOUNCE_DELAY);

  return (
    // TODO: Take care of search icon & text input colors between themes
    <div className={props.classes.root}>
      <SearchIcon classes={props.disabled ? props.classes.colorDisabled : null} className={cx} aria-label="Search for coins" />
      <TextField
        disabled={props.disabled}
        onChange={ (e) => debounceOnChange(e.target.value) }
        placeholder={T.translate('SEARCH_COINS_PLACEHOLDER')}
        type="search"
      />
    </div>
  );
};

SearchCoinsInput.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  isRTL: PropTypes.bool
};

export default withStyles(styleSheet)(SearchCoinsInput);
