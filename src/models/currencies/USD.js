import Currency from './Currency';
import T from 'i18n-react';

export default class USD extends Currency {
  constructor() {
    super({
      code: 'USD',
      name: T.translate('TARGET_CURRENCY_USD'),
      symbol: '$',
      symbolLocation: Currency.SYMBOL_LOCATIONS.START,
      factorFromUSD: 1
    });
  }
}
