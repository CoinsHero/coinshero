import Currency from './Currency';
import T from 'i18n-react';

export default class EUR extends Currency {
  constructor() {
    super({
      code: 'EUR',
      name: T.translate('TARGET_CURRENCY_EUR'),
      symbol: '€',
      symbolLocation: Currency.SYMBOL_LOCATIONS.START
    });
  }
}
