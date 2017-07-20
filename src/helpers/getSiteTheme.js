import { createMuiTheme } from 'material-ui/styles';
import lightBlue from 'material-ui/colors/lightBlue';
import red from 'material-ui/colors/red';
import pink from 'material-ui/colors/pink';
import createPalette from 'material-ui/styles/palette';

const getSiteTheme = (options) => {
  const theme = createMuiTheme({
    direction: options.isRTL ? 'rtl' : 'ltr',
    palette: createPalette({
      primary: lightBlue,
      accent: {
        ...pink,
        A300: '#383838',
        link: '#499bda',
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
    },
    MuiTableCell: {
      padding: {
        padding: `0 0 0 ${theme.spacing.unit * 2}px`,
        '&:last-child': {
          paddingLeft: 0,
          paddingRight: theme.spacing.unit
        }
      }
    }
  };

  return theme;
};

export default getSiteTheme;
