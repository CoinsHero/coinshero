import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {fade} from 'material-ui/utils/colorManipulator';

import {
  amber500, cyan700, amber400, amber700,
  grey600, fullWhite, white
} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: '#45D8FF',
    primary2Color: cyan700,
    primary3Color: grey600,
    accent1Color: amber700,
    accent2Color: amber500,
    accent3Color: amber400,
    textColor: fullWhite,
    secondaryTextColor: fade(fullWhite, 0.7),
    alternateTextColor: '#303030',
    canvasColor: '#303030',
    borderColor: fade(fullWhite, 0.3),
    disabledColor: fade(fullWhite, 0.3),
    pickerHeaderColor: fade(fullWhite, 0.12),
    clockCircleColor: fade(fullWhite, 0.12)
  },
  appBar: {
    color: '#303030',
    textColor: white
  },
  raisedButton: {
    textColor: white,
    primaryTextColor: white,
    secondaryTextColor: white
  }
});

const getSiteTheme = (isRTL) => {
  return Object.assign(muiTheme, {
    isRtl: !!isRTL
  });
};

export default getSiteTheme;
