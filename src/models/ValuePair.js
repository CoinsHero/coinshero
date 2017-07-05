import USD from './currencies/USD';
import Currency from './currencies/Currency';
import {toCurrencyFormat, round, safeParseFloat, safeParseInt} from '../helpers/numbers';
import {NO_VALUE_DATA_SYMBOL} from '../helpers/consts';

export default class ValuePair {
  constructor(pair = {}) {
    /**
     *
     * @type {Currency}
     */
    this.baseCurrency = pair.baseCurrency;
    /**
     *
     * @type {Currency}
     */
    this.targetCurrency = pair.targetCurrency;
    /**
     * The rank of the coin according to its market cap
     * @type {number}
     */
    this.rank = pair.rank;
    /**
     *
     * @type {number}
     */
    this.price = pair.price;
    /**
     * Display the value acording to the currency and locale
     * @type {string}
     */
    this.displayPrice = pair.displayPrice;
    /**
     *
     * @type {number}
     */
    this.percentChange24h = pair.percentChange24h;
    /**
     * Display the value acording to the currency and locale
     * @type {string}
     */
    this.displayPercentChange24h = pair.displayPercentChange24h;
    /**
     *
     * @type {number}
     */
    this.volume24h = pair.volume24h;
    /**
     * Display the value acording to the currency and locale
     * @type {string}
     */
    this.displayVolume24h = pair.displayVolume24h;
    /**
     *
     * @type {Value}
     */
    this.marketCap = pair.marketCap;
    /**
     * Display the value acording to the currency and locale
     * @type {string}
     */
    this.displayMarketCap = pair.displayMarketCap;
    /**
     * How many coins are there to trade in the world (Haven't been minded yet)
     * @type {number}
     */
    this.availableSupply = pair.availableSupply;
    /**
     * Display the value acording to the currency and locale
     * @type {string}
     */
    this.displayAvailableSupply = pair.displayAvailableSupply;
    /**
     * The UTC timestamp of the update of this coin
     * @type {undefined}
     */
    this.lastUpdateTimestamp = pair.lastUpdateTimestamp;
  }

  static changeCurrency(valuePair, locale, targetCurrency) {
    const newPair = new ValuePair(valuePair);
    newPair.targetCurrency = targetCurrency;

    newPair.displayMarketCap = Currency.adjustCurrencyValue(targetCurrency, newPair.marketCap, 0, locale.code);
    newPair.displayPrice = Currency.adjustCurrencyValue(targetCurrency,
      newPair.price, ValuePair._getPriceDecimalDigits(newPair.price), locale.code);
    newPair.displayVolume24h = Currency.adjustCurrencyValue(targetCurrency, newPair.volume24h, 0, locale.code);

    return newPair;
  }

  static _getPriceDecimalDigits(price) {
    return price >= 1 ? 2 : 8;
  }

  static parse(coin, locale, index, targetCurrency = new USD()) {
    const valuePair = new ValuePair();

    valuePair.baseCurrency = new Currency({
      code: coin.short,
      name: coin.long,
      symbol: coin.short,
      symbolLocation: Currency.SYMBOL_LOCATIONS.END,
      imageUrl: coin.imageUrl,
      officialUrl: coin.officialUrl,
      status: coin.status,
      factorFromUSD: safeParseFloat(coin.price)
    });
    valuePair.percentChange24h = safeParseFloat(coin.cap24hrChange);
    valuePair.displayPercentChange24h = `${round(coin.cap24hrChange, 2)}%`;

    valuePair.marketCap = safeParseFloat(coin.mktcap);
    valuePair.displayMarketCap = Currency.adjustCurrencyValue(targetCurrency, coin.mktcap, 0, locale.code);

    valuePair.price = safeParseFloat(coin.price);
    valuePair.displayPrice = Currency.adjustCurrencyValue(targetCurrency,
      coin.price, ValuePair._getPriceDecimalDigits(coin.price), locale.code);

    valuePair.availableSupply = safeParseInt(coin.supply);
    valuePair.displayAvailableSupply = coin.supply !== NO_VALUE_DATA_SYMBOL ?
      toCurrencyFormat(coin.supply, locale.code, 0) :
      NO_VALUE_DATA_SYMBOL;

    valuePair.volume24h = safeParseFloat(coin.volume);
    valuePair.displayVolume24h = Currency.adjustCurrencyValue(targetCurrency, coin.volume, 0, locale.code);

    valuePair.rank = index;
    valuePair.targetCurrency = targetCurrency;
    valuePair.lastUpdateTimestamp = coin.time;

    return valuePair;
  }
}
