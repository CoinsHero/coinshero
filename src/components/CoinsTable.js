import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Table, {
  TableCell,
  TableBody,
  TableHead,
  TableRow
} from 'material-ui/Table';
import T from 'i18n-react';
import Paper from 'material-ui/Paper';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { red, green } from 'material-ui/styles/colors';
import classnamesjss from '../helpers/classnamesjss';

const numbersStrength = 500;
const styleSheet = createStyleSheet('CoinsTable', (theme) => ({
  'root': {
    width: '90%'
  },
  'root__TableCell': {
    textAlign: 'center'
  },
  'root__TableCell__percent-change-twenty-four-h': {
    direction: 'ltr',
    display: 'inline-block',
    color: green[numbersStrength]
  },
  'root__TableCell__percent-change-twenty-four-h--negative': {
    color: red[numbersStrength]
  }
}));

class CoinsTable extends Component {
  _renderRows(props, tableCellClass = {}) {
    return props.valuePairs.map((pair) => {
      const percentChange24hClasses = classnamesjss(props.classes,
        'root__TableCell__percent-change-twenty-four-h',
        {'root__TableCell__percent-change-twenty-four-h--negative': pair.percentChange24h < 0}
      );

      return (
        <TableRow hover={props.showRowHover} key={pair.rank}>
          <TableCell className={tableCellClass}>{pair.rank}</TableCell>
          <TableCell className={tableCellClass}>{pair.name}</TableCell>
          <TableCell className={tableCellClass}>{pair.displayMarketCap}</TableCell>
          <TableCell className={tableCellClass}>{pair.displayPrice}</TableCell>
          <TableCell className={tableCellClass}>{pair.displayAvailableSupply}</TableCell>
          <TableCell className={tableCellClass}>{pair.displayVolume24h}</TableCell>
          <TableCell className={tableCellClass}>
            <span className={percentChange24hClasses}>{pair.displayPercentChange24h}</span>
          </TableCell>
        </TableRow>
      );
    });
  }

  render() {
    const tableCellClass = this.props.classes['root__TableCell'];

    // TODO: Add TABLE_HEADER_RANK_TOOLTIP & TABLE_HEADER_AVAILABLE_SUPPLY_TOOLTIP once https://github.com/callemall/material-ui/issues/2230
    return (
      <Paper className={this.props.classes.root} elevation={12}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={tableCellClass}>#</TableCell>
              <TableCell className={tableCellClass}>{T.translate('TABLE_HEADER_NAME')}</TableCell>
              <TableCell className={tableCellClass}>{T.translate('TABLE_HEADER_MARKET_CAP')}</TableCell>
              <TableCell className={tableCellClass}>{T.translate('TABLE_HEADER_PRICE')}</TableCell>
              <TableCell className={tableCellClass}>{T.translate('TABLE_HEADER_AVAILABLE_SUPPLY')}</TableCell>
              <TableCell className={tableCellClass}>{T.translate('TABLE_HEADER_24H_VOLUME')}</TableCell>
              <TableCell className={tableCellClass}>{T.translate('TABLE_HEADER_24H_PERCENTAGE_CHANGE')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this._renderRows(this.props, tableCellClass)}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

CoinsTable.propTypes = {
  valuePairs: PropTypes.arrayOf(PropTypes.object),
  showRowHover: PropTypes.bool,
  classes: PropTypes.object.isRequired
};

CoinsTable.defaultProps = {
  valuePairs: [],
  showRowHover: true
};

export default withStyles(styleSheet)(CoinsTable);
