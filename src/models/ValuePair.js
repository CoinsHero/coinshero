import USD from './currencies/USD';
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
     * The UTC timestamp of the update of this coin
     * @type {undefined}
     */
    this.lastUpdateTimestamp = undefined;
  }

  static parse(coin, locale, index) {
    const valuePair = new ValuePair();
    const targetCurrency = new USD();

    valuePair.baseCurrency = new Currency({
      code: coin.short,
      name: coin.long,
      symbol: coin.short,
      symbolLocation: Currency.SYMBOL_LOCATIONS.END,
      imageUrl: coin.imageUrl
    });
    valuePair.percentChange24h = coin.cap24hrChange;
    valuePair.displayPercentChange24h = `${round(coin.cap24hrChange, 2)}%`;
    valuePair.rank = index;
    valuePair.marketCap = coin.mktcap;
    valuePair.displayMarketCap = Currency.adjustCurrencyValue(targetCurrency, coin.mktcap, 0, locale.code);
    valuePair.price = coin.price;
    valuePair.displayPrice = Currency.adjustCurrencyValue(targetCurrency, coin.price, coin.price >= 1 ? 2 : 8, locale.code);
    valuePair.availableSupply = coin.supply;
    valuePair.displayAvailableSupply = toCurrencyFormat(coin.supply, locale.code, 0);
    valuePair.volume24h = coin.volume;
    valuePair.displayVolume24h = Currency.adjustCurrencyValue(targetCurrency, coin.volume, 0, locale.code);
    valuePair.targetCurrency = targetCurrency;
    valuePair.lastUpdateTimestamp = coin.time;

    return valuePair;
  }
}
