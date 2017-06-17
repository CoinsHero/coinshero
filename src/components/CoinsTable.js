import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import T from 'i18n-react';
import Paper from 'material-ui/Paper';

import '../styles/components/_CoinsTable.scss';

class CoinsTable extends Component {
  _renderRows(valuePairs, columnStyle = {}) {
    return valuePairs.map((pair) => {
      const percentChange24hClasses = classnames(
        'TableRowColumn__percent-change-twenty-four-h',
        {'TableRowColumn__percent-change-twenty-four-h--negative': pair.percentChange24h < 0}
      );

      return (
        <TableRow key={pair.rank}>
          <TableRowColumn style={columnStyle}>{pair.rank}</TableRowColumn>
          <TableRowColumn style={columnStyle}>{pair.name}</TableRowColumn>
          <TableRowColumn style={columnStyle}>{pair.displayMarketCap}</TableRowColumn>
          <TableRowColumn style={columnStyle}>{pair.displayPrice}</TableRowColumn>
          <TableRowColumn style={columnStyle}>{pair.displayAvailableSupply}</TableRowColumn>
          <TableRowColumn style={columnStyle}>{pair.displayVolume24h}</TableRowColumn>
          <TableRowColumn style={columnStyle}>
            <span className={percentChange24hClasses}>{pair.displayPercentChange24h}</span>
          </TableRowColumn>
        </TableRow>
      );
    });
  }

  render() {
    const styleAlignTextCenter = {textAlign: 'center'};

    return (
      <Paper className='CoinsTable' zDepth={5}>
        <Table selectable={this.props.selectable}>
          <TableHeader adjustForCheckbox={this.props.displayRowCheckbox} displaySelectAll={this.props.displaySelectAll}>
            <TableRow>
              <TableHeaderColumn style={styleAlignTextCenter} tooltip={T.translate('TABLE_HEADER_RANK_TOOLTIP')}>#</TableHeaderColumn>
              <TableHeaderColumn style={styleAlignTextCenter}>{T.translate('TABLE_HEADER_NAME')}</TableHeaderColumn>
              <TableHeaderColumn style={styleAlignTextCenter}>{T.translate('TABLE_HEADER_MARKET_CAP')}</TableHeaderColumn>
              <TableHeaderColumn style={styleAlignTextCenter}>{T.translate('TABLE_HEADER_PRICE')}</TableHeaderColumn>
              <TableHeaderColumn style={styleAlignTextCenter} tooltip={T.translate('TABLE_HEADER_AVAILABLE_SUPPLY_TOOLTIP')}>
                {T.translate('TABLE_HEADER_AVAILABLE_SUPPLY')}
              </TableHeaderColumn>
              <TableHeaderColumn style={styleAlignTextCenter}>{T.translate('TABLE_HEADER_24H_VOLUME')}</TableHeaderColumn>
              <TableHeaderColumn style={styleAlignTextCenter}>{T.translate('TABLE_HEADER_24H_PERCENTAGE_CHANGE')}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={this.props.displayRowCheckbox}
            preScanRows={this.props.preScanRows}
            showRowHover={this.props.showRowHover}>
            {this._renderRows(this.props.valuePairs, styleAlignTextCenter)}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

CoinsTable.propTypes = {
  valuePairs: PropTypes.arrayOf(PropTypes.object),
  displayRowCheckbox: PropTypes.bool,
  displaySelectAll: PropTypes.bool,
  selectable: PropTypes.bool,
  showRowHover: PropTypes.bool,
  preScanRows: PropTypes.bool
};

CoinsTable.defaultProps = {
  valuePairs: [],
  displayRowCheckbox: false,
  displaySelectAll: false,
  selectable: false,
  showRowHover: true,
  preScanRows: false
};

export default CoinsTable;
