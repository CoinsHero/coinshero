import Currency from './Currency';
import T from 'i18n-react';

export default class USD extends Currency {
  constructor() {
    super({
      code: 'NIS',
      name: T.translate('TARGET_CURRENCY_NIS'),
      symbol: '₪',
      symbolLocation: Currency.SYMBOL_LOCATIONS.START,
      // TODO: Change temp value
      factorFromUSD: 3.49
    });
  }
}
