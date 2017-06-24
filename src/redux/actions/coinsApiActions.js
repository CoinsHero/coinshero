import { CALL_API } from 'redux-api-middleware';
import * as Actions from '../ActionNames';
import config from 'config';

export const fetchCoinsData = (locale) => ({
  [CALL_API]: {
    endpoint: `${config.ORIGINS.COINS_IO}/front`,
    method: 'GET',
    types: [
      Actions.FETCH_COINS_DATA,
      {
        type: Actions.FETCH_COINS_DATA_SUCCESS,
        meta: { locale }
      },
      Actions.FETCH_COINS_DATA_FAILURE
    ]
  }
});
