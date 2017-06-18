import { createMuiTheme } from 'material-ui/styles';
import { grey, pink, red } from 'material-ui/styles/colors';
import createPalette from 'material-ui/styles/palette';

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
