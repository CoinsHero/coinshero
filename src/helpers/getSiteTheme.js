import { createMuiTheme } from 'material-ui/styles';
import { grey, pink, red } from 'material-ui/styles/colors';
import createPalette from 'material-ui/styles/palette';

// // https://material-ui-1dab0.firebaseapp.com/customization/themes#the-other-variables
// const muiTheme = getMuiTheme({
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

const getSiteTheme = (isRTL) => {
  const theme = createMuiTheme({
    direction: isRTL ? 'rtl' : 'ltr',
    palette: createPalette({
      primary: pink,
      accent: {
        ...grey,
        A400: '#383838'
      },
      error: red,
      type: 'dark' // Switching the dark mode on is a single property value change.
    })
  });

  theme.overrides = {
    MuiAppBar: {
      root: {
        background: theme.palette.accent['A400']
      }
    }
  };

  return theme;
};

export default getSiteTheme;
