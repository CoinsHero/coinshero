import { createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';

// import {fade} from 'material-ui/utils/colorManipulator';
// import spacing from 'material-ui/styles/spacing';

// // All colors could be found here: https://material-ui-1dab0.firebaseapp.com/style/color
// import {
//   red, cyan700, grey600, pink700, pink500, pink400, fullWhite
// } from 'material-ui/styles/colors';

// const primaryColor = '#383838';

const theme = createMuiTheme({
  palette: createPalette({
    type: 'dark' // Switching the dark mode on is a single property value change.
  }),
  overrides: {

  }
});

// // https://material-ui-1dab0.firebaseapp.com/customization/themes#the-other-variables
// const muiTheme = getMuiTheme({
//   spacing: spacing,
//   fontFamily: 'Roboto, sans-serif',
//   borderRadius: 2,
//   palette: {
//     primary1Color: primaryColor,
//     primary2Color: cyan700,
//     primary3Color: grey600,
//     accent1Color: pink700,
//     accent2Color: pink500,
//     accent3Color: pink400,
//     textColor: fullWhite,
//     secondaryTextColor: fade(fullWhite, 0.7),
//     alternateTextColor: fade(fullWhite, 0.9),
//     canvasColor: primaryColor,
//     borderColor: fade(fullWhite, 0.3),
//     disabledColor: fade(fullWhite, 0.3),
//     pickerHeaderColor: fade(fullWhite, 0.12),
//     clockCircleColor: fade(fullWhite, 0.12)
//   }
// });
//
// const overrides = {
//   appBar: {
//     color: muiTheme.palette.primary1Color,
//     textColor: muiTheme.palette.alternateTextColor
//   },
//   tabs: {
//     backgroundColor: muiTheme.palette.primary1Color,
//     textColor: muiTheme.palette.secondaryTextColor,
//     selectedTextColor: muiTheme.palette.alternateTextColor
//   },
//   refreshIndicator: {
//     strokeColor: muiTheme.palette.primary1Color,
//     loadingStrokeColor: muiTheme.palette.accent2Color
//   }
// };
//
// merge(muiTheme, overrides);

const getSiteTheme = (isRTL) => {
  return Object.assign(theme, {
    direction: isRTL ? 'rtl' : 'ltr'
  });
};

export default getSiteTheme;
