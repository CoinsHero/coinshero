import { createMuiTheme } from 'material-ui/styles';
import { lightBlue, pink, red } from 'material-ui/styles/colors';
import createPalette from 'material-ui/styles/palette';

const getSiteTheme = (options) => {
  const theme = createMuiTheme({
    direction: options.isRTL ? 'rtl' : 'ltr',
    palette: createPalette({
      primary: lightBlue,
      accent: {
        ...pink,
        A400: '#484848'
      },
      error: red,
      type: options.isDarkTheme ? 'dark' : 'light'
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
