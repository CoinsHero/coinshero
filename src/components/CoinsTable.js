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

import {round, toCurrencyFormat} from '../helpers/numbers';
import Currency from '../models/currencies/Currency';

import '../styles/components/_CoinsTable.scss';

class CoinsTable extends Component {
  _renderRows(valuePairs, locale, columnStyle = {}) {
    return valuePairs.map((pair) => {
      // TODO: Probably all this has to go to a parse function after the API call from the backend:
      // https://github.com/kazazor/coinsmarket/issues/15
      const price = Currency.adjustCurrencyValue(pair.targetCurrency, pair.price, 8, locale.code);
      const marketCap = Currency.adjustCurrencyValue(pair.targetCurrency, pair.marketCap, 0, locale.code);
      const volume24h = Currency.adjustCurrencyValue(pair.targetCurrency, pair.volume24h, 0, locale.code);
      const availableSupply = toCurrencyFormat(pair.availableSupply, locale.code);
      const percentChange24h = round(pair.percentChange24h, 2);

      const percentChange24hClasses = classnames(
        'TableRowColumn__percent-change-twenty-four-h',
        {'TableRowColumn__percent-change-twenty-four-h--negative': percentChange24h < 0}
      );

      return (
        <TableRow key={pair.rank}>
          <TableRowColumn style={columnStyle}>{pair.rank}</TableRowColumn>
          <TableRowColumn style={columnStyle}>{pair.name}</TableRowColumn>
          <TableRowColumn style={columnStyle}>{marketCap}</TableRowColumn>
          <TableRowColumn style={columnStyle}>{price}</TableRowColumn>
          <TableRowColumn style={columnStyle}>{availableSupply}</TableRowColumn>
          <TableRowColumn style={columnStyle}>{volume24h}</TableRowColumn>
          <TableRowColumn style={columnStyle}>
            <span className={percentChange24hClasses}>{`${percentChange24h}%`}</span>
          </TableRowColumn>
        </TableRow>
      );
    });
  }

  render() {
    const styleAlignTextCenter = {textAlign: 'center'};

    return (
      <div className='CoinsTable'>
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
            {this._renderRows(this.props.valuePairs, this.props.locale, styleAlignTextCenter)}
          </TableBody>
        </Table>
      </div>
    );
  }
}

CoinsTable.propTypes = {
  valuePairs: PropTypes.arrayOf(PropTypes.object),
  displayRowCheckbox: PropTypes.bool,
  displaySelectAll: PropTypes.bool,
  selectable: PropTypes.bool,
  showRowHover: PropTypes.bool,
  preScanRows: PropTypes.bool,
  locale: PropTypes.shape({
    code: PropTypes.string.isRequired,
    isRTL: PropTypes.bool
  })
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
