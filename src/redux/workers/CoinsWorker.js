import * as Actions from '../ActionNames';

self.onmessage = ({ data: action }) => {
  switch (action.type) {
  case Actions.FETCH_COINS_LIST_SUCCESS:
  {
    if (action.payload && action.payload.BaseImageUrl && action.payload.Data) {
      const baseImageUrl = action.payload.BaseImageUrl;
      const coinsKeys = Object.keys(action.payload.Data);
      const coinsLength = coinsKeys.length;
      const coinsList = {};
      let index;
      let imageRelativeUrl;

      for (index = 0; index < coinsLength; index++) {
        imageRelativeUrl = action.payload.Data[coinsKeys[index]].ImageUrl;
        coinsList[coinsKeys[index].toLowerCase()] = {
          imageUrl: imageRelativeUrl ? `${baseImageUrl}${imageRelativeUrl}` : undefined
        };
      }

      action.payload = {coinsList};
    }

    self.postMessage(action);

    break;
  }
  default: {
    self.postMessage(action);

    break;
  }
  }
};
