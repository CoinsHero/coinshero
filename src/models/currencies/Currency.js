import {round, toCurrencyFormat} from '../../helpers/numbers';
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
     * A URL to the icon of the currency
     * @type {string}
     */
    this.iconUrl = undefined;
  }

  static adjustCurrencyValue(currency, value, decimalNumbers = 2, localeCode = 'en') {
    value = round(value, decimalNumbers);
    value = toCurrencyFormat(value, localeCode, decimalNumbers);

    return currency.symbolLocation === Currency.SYMBOL_LOCATIONS.START ?
      `${currency.symbol}${value}` :
      `${value} ${currency.symbol}`;
  }
}

Currency.SYMBOL_LOCATIONS = {
  START: 's',
  END: 'e'
};

export default Currency;
