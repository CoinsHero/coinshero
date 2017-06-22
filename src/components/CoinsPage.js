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
    let displayedValuePairs;

    if (nextProps.dataManipulations) {
      displayedValuePairs = this.state.displayedValuePairs;
      const searchQuery = nextProps.dataManipulations.searchQuery;

      if (searchQuery === '' && nextProps.valuePairs.length !== this.state.displayedValuePairs.length) {
        // First initialization of the component and there isn't any query string to filter according to
        displayedValuePairs = nextProps.valuePairs;
      } else if (this.props.dataManipulations.searchQuery !== searchQuery && searchQuery === '') {
        // In case we deleted the search query there is no need to run over the list. Just show it all
        displayedValuePairs = nextProps.valuePairs;
      } else if (this.props.dataManipulations.searchQuery !== searchQuery) {
        // Search query has been entered by the user
        displayedValuePairs = nextProps.valuePairs.filter((pair) => {
          return pair.baseCurrency.displayName.match(new RegExp(searchQuery, 'i'));
        });
      }
    } else {
      displayedValuePairs = nextProps.valuePairs;
    }

    this.setState({displayedValuePairs: displayedValuePairs});
  }

  render() {
    const classes = this.props.classes;

    return (
      <div className={classes.root}>
        <CoinsTable showLoading={this.props.valuePairs.length === 0} valuePairs={this.state.displayedValuePairs} />
      </div>
    );
  }
}

CoinsPage.propTypes = {
  dataManipulations: PropTypes.shape({
    searchQuery: PropTypes.string
  }),
  classes: PropTypes.object.isRequired,
  valuePairs: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withStyles(styleSheet)(CoinsPage);
