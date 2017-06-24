import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';

import CoinsTable from './CoinsTable';

const styleSheet = createStyleSheet('CoinsPage', (theme) => ({
  'root': {
    width: '100%',
    marginBottom: theme.spacing.unit * 3
  }
}));

class CoinsPage extends Component {
  constructor(props) {
    super();

    this.state = {
      displayedValuePairs: props.valuePairs
    };
  }

  componentWillReceiveProps(nextProps) {
    let displayedValuePairs = nextProps.valuePairs;

    if (nextProps.dataManipulations) {
      const nextSearchQuery = nextProps.dataManipulations.searchQuery;

      if (nextSearchQuery !== '') {
        // Search query has been entered by the user
        displayedValuePairs = nextProps.valuePairs.filter((pair) => {
          return pair.baseCurrency.displayName.match(new RegExp(nextSearchQuery, 'i'));
        });
      }
    }

    this.setState({displayedValuePairs});
  }

  render() {
    const classes = this.props.classes;

    return (
      <div className={classes.root}>
        <CoinsTable locale={this.props.locale}
          showLoading={this.props.valuePairs.length === 0}
          valuePairs={this.state.displayedValuePairs} />
      </div>
    );
  }
}

CoinsPage.propTypes = {
  dataManipulations: PropTypes.shape({
    searchQuery: PropTypes.string
  }),
  classes: PropTypes.object.isRequired,
  valuePairs: PropTypes.arrayOf(PropTypes.object).isRequired,
  locale: PropTypes.shape({
    code: PropTypes.string,
    isRTL: PropTypes.bool
  })
};

export default withStyles(styleSheet)(CoinsPage);
