import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { Toolbar } from 'material-ui';

import CoinsTable from './CoinsTable';
import SearchCoinsInput from './SearchCoinsInput';

const styleSheet = createStyleSheet('CoinsPage', (theme) => ({
  'root': {
    width: '90%',
    marginBottom: theme.spacing.unit * 3
  },
  'root_ToolBar': {
    padding: 0
  }
}));

class CoinsPage extends Component {
  constructor(props) {
    super();

    this.state = {
      displayedValuePairs: props.valuePairs,
      searchQuery: ''
    };
  }

  _performDataManipulation(options) {
    let displayedValuePairs = options.valuePairs;

    if (options.dataManipulations) {
      const nextSearchQuery = options.dataManipulations.searchQuery;

      if (nextSearchQuery !== '') {
        // Search query has been entered by the user
        displayedValuePairs = options.valuePairs.filter((pair) => {
          return pair.baseCurrency.displayName.match(new RegExp(nextSearchQuery, 'i'));
        });
      }
    }

    return displayedValuePairs;
  }

  _onSearchChange(searchQuery) {
    const displayedValuePairs = this._performDataManipulation({
      valuePairs: this.props.valuePairs,
      dataManipulations: {
        searchQuery
      }
    });

    this.setState({searchQuery, displayedValuePairs});
  }

  componentWillReceiveProps(nextProps) {
    const displayedValuePairs = this._performDataManipulation({
      valuePairs: nextProps.valuePairs,
      dataManipulations: {
        searchQuery: this.state.searchQuery
      }
    });

    this.setState({displayedValuePairs});
  }

  render() {
    const classes = this.props.classes;

    return (
      <div className={classes.root}>
        <Toolbar className={this.props.classes.root_ToolBar}>
          <SearchCoinsInput disabled={this.props.valuePairs.length === 0}
            isRTL={this.props.locale.isRTL}
            onChange={this._onSearchChange.bind(this)}/>
        </Toolbar>
        <CoinsTable locale={this.props.locale}
          showLoading={this.props.valuePairs.length === 0}
          valuePairs={this.state.displayedValuePairs} />
      </div>
    );
  }
}

CoinsPage.propTypes = {
  classes: PropTypes.object.isRequired,
  valuePairs: PropTypes.arrayOf(PropTypes.object).isRequired,
  locale: PropTypes.shape({
    code: PropTypes.string,
    isRTL: PropTypes.bool
  })
};

export default withStyles(styleSheet)(CoinsPage);
