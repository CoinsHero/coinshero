import {round, toCurrencyFormat} from '../../helpers/numbers';
import {NO_VALUE_DATA_SYMBOL} from '../../helpers/consts';

class Currency {
  constructor(options) {
    /**
     *
     * @type {string}
     */
    this.code = options.code;
    /**
     *
     * @type {string}
     */
    this.name = options.name;
    /**
     * The name of the currency to display to the user
     * @type {undefined}
     */
    this.displayName = options.name && options.symbol ? `${options.name} (${options.symbol})` : undefined;
    /**
     * A symbol (like $) to show next to the currency value
     * @type {string}
     */
    this.symbol = options.symbol;
    /**
     * If the symbol of the currency should appear at the start or the end of the price
     * @type {Currency.SYMBOL_LOCATIONS}
     */
    this.symbolLocation = Currency.SYMBOL_LOCATIONS[options.symbolLocation] || Currency.SYMBOL_LOCATIONS.START;
    /**
     * The image url of the currency
     * @type {string}
     */
    this.imageUrl = options.imageUrl;
    /**
     * The official website of the coin
     * @type {string}
     */
    this.officialUrl = options.officialUrl;
    /**
     * The status of the coin
     * @type {string}
     */
    this.status = options.status;
    /**
     * The factor from 1 USD
     * @type {number}
     */
    this.factorFromUSD = options.factorFromUSD;
  }

  static adjustCurrencyValue(targetCurrency, value, decimalNumbers = 2, localeCode = 'en') {
    if (value === NO_VALUE_DATA_SYMBOL) {
      return value;
    } else {
      value = value * targetCurrency.factorFromUSD;
      value = round(value, decimalNumbers);
      value = toCurrencyFormat(value, localeCode, decimalNumbers);

      return targetCurrency.symbolLocation === Currency.SYMBOL_LOCATIONS.START ?
        `${targetCurrency.symbol}${value}` :
        `${value} ${targetCurrency.symbol}`;
    }
  }
}

Currency.SYMBOL_LOCATIONS = {
  START: 's',
  END: 'e'
};

export default Currency;
