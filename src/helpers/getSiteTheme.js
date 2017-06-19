import { createMuiTheme } from 'material-ui/styles';
import { grey, pink, red } from 'material-ui/styles/colors';
import createPalette from 'material-ui/styles/palette';

const getSiteTheme = (options) => {
  const theme = createMuiTheme({
    direction: options.isRTL ? 'rtl' : 'ltr',
    palette: createPalette({
      primary: pink,
      accent: {
        ...grey,
        A400: '#383838'
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
