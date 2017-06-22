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
  constructor() {
    super();

    this.state = {
      displayedValuePairs: []
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('CoinsPage');
    if (nextProps.dataManipulations) {
      let displayedValuePairs = this.state.displayedValuePairs;
      const searchQuery = nextProps.dataManipulations.searchQuery;

      if (searchQuery === '' && this.props.valuePairs.length !== this.state.displayedValuePairs.length) {
        // First initialization of the component and there isn't any query string to filter according to
        displayedValuePairs = this.props.valuePairs;
      } else if (this.props.dataManipulations.searchQuery !== searchQuery && searchQuery === '') {
        // In case we deleted the search query there is no need to run over the list. Just show it all
        displayedValuePairs = this.props.valuePairs;
      } else if (this.props.dataManipulations.searchQuery !== searchQuery) {
        // Search query has been entered by the user
        displayedValuePairs = this.props.valuePairs.filter((pair) => {
          return pair.baseCurrency.displayName.match(new RegExp(searchQuery, 'i'));
        });
      }

      this.setState({displayedValuePairs: displayedValuePairs});
    }
  }

  render() {
    const classes = this.props.classes;

    return (
      <div className={classes.root}>
        <CoinsTable valuePairs={this.state.displayedValuePairs} />
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
