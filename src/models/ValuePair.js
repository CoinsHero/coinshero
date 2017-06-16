import Currency from './currencies/Currency';

export default class ValuePair {

  constructor() {
    /**
     *
     * @type {Currency}
     */
    this.baseCurrency = undefined;
    /**
     *
     * @type {Currency}
     */
    this.targetCurrency = undefined;
    /**
     * The rank of the coin according to its market cap
     * @type {number}
     */
    this.rank = undefined;
    /**
     *
     * @type {number}
     */
    this.price = undefined;
    /**
     *
     * @type {number}
     */
    this.percentChange1h = undefined;
    /**
     *
     * @type {number}
     */
    this.percentChange24h = undefined;
    /**
     *
     * @type {number}
     */
    this.percentChange7d = undefined;
    /**
     *
     * @type {number}
     */
    this.volume24h = undefined;
    /**
     *
     * @type {Value}
     */
    this.marketCap = undefined;
    /**
     * How many coins are there to trade in the world (Haven't been minded yet)
     * @type {number}
     */
    this.availableSupply = undefined;
    /**
     * timestamp UTC
     * @type {number}
     */
    this.lastUpdate = undefined;
  }
}
