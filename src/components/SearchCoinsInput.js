import React, {Component} from 'react';
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

class SearchCoinsInput extends Component {
  constructor() {
    super();

    this._focus = this._focus.bind(this);
  }

  _focus() {
    this.textInput.focus();
  }

  componentDidUpdate() {
    if (this.props.autoFocus) {
      this._focus();
    }
  }

  render() {
    const props = this.props;

    const cx = classnamesjss(props.classes,
      {'root__SearchIcon': !props.isRTL},
      {'root__SearchIcon--rtl': props.isRTL}
    );

    const debounceOnChange = debounce(props.onChange, CLIENT_SIDE_DEBOUNCE_DELAY);

    return (
      <div className={props.classes.root}>
        <SearchIcon className={cx} aria-label="Search for coins" />
        <TextField
          inputRef={(input) => {
            this.textInput = input;
          }}
          disabled={props.disabled}
          onChange={ (e) => debounceOnChange(e.target.value) }
          placeholder={T.translate('SEARCH_COINS_PLACEHOLDER')}
          type="search"
        />
      </div>
    );
  }
}

SearchCoinsInput.propTypes = {
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  isRTL: PropTypes.bool
};

export default withStyles(styleSheet)(SearchCoinsInput);
