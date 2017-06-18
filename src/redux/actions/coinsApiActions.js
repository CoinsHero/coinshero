import { CALL_API } from 'redux-api-middleware';
import * as Actions from '../ActionNames';
import config from 'config';

export const fetchCoinsFront = (locale) => ({
  [CALL_API]: {
    endpoint: `${config.ORIGINS.COINS_API}/front`,
    method: 'GET',
    types: [
      Actions.FETCH_COINS_FRONT,
      {
        type: Actions.FETCH_COINS_FRONT_SUCCESS,
        meta: { locale }
      },
      Actions.FETCH_COINS_FRONT_FAILURE
    ]
  }
});
