import Currency from './currencies/Currency';
import {toCurrencyFormat, round} from '../helpers/numbers';

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
     * Display the value acording to the currency and locale
     * @type {string}
     */
    this.displayPrice = undefined;
    /**
     *
     * @type {number}
     */
    this.percentChange24h = undefined;
    /**
     * Display the value acording to the currency and locale
     * @type {string}
     */
    this.displayPercentChange24h = undefined;
    /**
     *
     * @type {number}
     */
    this.volume24h = undefined;
    /**
     * Display the value acording to the currency and locale
     * @type {string}
     */
    this.displayVolume24h = undefined;
    /**
     *
     * @type {Value}
     */
    this.marketCap = undefined;
    /**
     * Display the value acording to the currency and locale
     * @type {string}
     */
    this.displayMarketCap = undefined;
    /**
     * How many coins are there to trade in the world (Haven't been minded yet)
     * @type {number}
     */
    this.availableSupply = undefined;
    /**
     * Display the value acording to the currency and locale
     * @type {string}
     */
    this.displayAvailableSupply = undefined;
    /**
     * timestamp UTC
     * @type {number}
     */
    this.lastUpdate = undefined;
  }

  static parse(object, locale) {
    const pair = Object.assign({}, object);
    pair.displayPrice = Currency.adjustCurrencyValue(pair.targetCurrency, pair.price, 8, locale.code);
    pair.displayMarketCap = Currency.adjustCurrencyValue(pair.targetCurrency, pair.marketCap, 0, locale.code);
    pair.displayVolume24h = Currency.adjustCurrencyValue(pair.targetCurrency, pair.volume24h, 0, locale.code);
    pair.displayAvailableSupply = toCurrencyFormat(pair.availableSupply, locale.code);
    pair.displayPercentChange24h = `${round(pair.percentChange24h, 2)}%`;

    return pair;
  }
}
