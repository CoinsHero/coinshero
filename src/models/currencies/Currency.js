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
     * A symbol (like $) to show next to the currency value
     * @type {string}
     */
    this.symbol = options.symbol;
    /**
     * If the symbol of the currency should appear at the start or the end of the price
     * @type {Currency.SYMBOL_LOCATIONS}
     */
    this.symbolLocation = Currency.SYMBOL_LOCATIONS[options.symbolLocation] || Currency.SYMBOL_LOCATIONS.START;
  }
}

Currency.SYMBOL_LOCATIONS = {
  START: 's',
  END: 'e'
};

export default Currency;
