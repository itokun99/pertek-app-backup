import { alpha, createTheme, darken, lighten, colors } from '@mui/material';
import { blue } from '@mui/material/colors';
const themeColors = {
  primary: '#0D30BB',
  secondary: '#6E759F',
  success: '#57CA22',
  warning: '#FFA319',
  error: '#FF1943',
  info: '#33C2FF',
  black: '#223354',
  white: '#ffffff',
  primaryAlt: '#000C57',
};

export const theColors = {
  gradients: {
    blue1: 'linear-gradient(to bottom right, rgb(0, 127, 255), rgb(0, 89, 178), 120%)',
    blue2: 'linear-gradient(135deg, #ABDCFF 0%, #0396FF 100%)',
    blue3: 'linear-gradient(127.55deg, #141E30 3.73%, #243B55 92.26%)',
    blue4: 'linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)',
    blue5: 'linear-gradient(135deg, #97ABFF 10%, #123597 100%)',
    orange1: 'linear-gradient(135deg, #FCCF31 0%, #F55555 100%)',
    orange2: 'linear-gradient(135deg, #FFD3A5 0%, #FD6585 100%)',
    orange3: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
    purple1: 'linear-gradient(135deg, #43CBFF 0%, #9708CC 100%)',
    purple3: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    pink1: 'linear-gradient(135deg, #F6CEEC 0%, #D939CD 100%)',
    pink2: 'linear-gradient(135deg, #F761A1 0%, #8C1BAB 100%)',
    green1: 'linear-gradient(135deg, #FFF720 0%, #3CD500 100%)',
    green2: 'linear-gradient(to bottom, #00b09b, #96c93d)',
    black1: 'linear-gradient(100.66deg, #434343 6.56%, #000000 93.57%)',
    black2: 'linear-gradient(60deg, #29323c 0%, #485563 100%)',
  },
  shadows: {
    success: '0px 1px 4px rgba(68, 214, 0, 0.25), 0px 3px 12px 2px rgba(68, 214, 0, 0.35)',
    error: '0px 1px 4px rgba(255, 25, 67, 0.25), 0px 3px 12px 2px rgba(255, 25, 67, 0.35)',
    info: '0px 1px 4px rgba(51, 194, 255, 0.25), 0px 3px 12px 2px rgba(51, 194, 255, 0.35)',
    primary: '0px 1px 4px rgba(85, 105, 255, 0.25), 0px 3px 12px 2px rgba(85, 105, 255, 0.35)',
    warning: '0px 1px 4px rgba(255, 163, 25, 0.25), 0px 3px 12px 2px rgba(255, 163, 25, 0.35)',
    card: '0px 9px 16px rgba(159, 162, 191, .18), 0px 2px 2px rgba(159, 162, 191, 0.32)',
    paper: 'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
    cardSm: '0px 2px 3px rgba(159, 162, 191, .18), 0px 1px 1px rgba(159, 162, 191, 0.32)',
    cardLg: '0 5rem 14rem 0 rgb(255 255 255 / 30%), 0 0.8rem 2.3rem rgb(0 0 0 / 60%), 0 0.2rem 0.3rem rgb(0 0 0 / 45%)',
  },
  layout: {
    general: {
      bodyBg: '#f2f5f9',
    },
    sidebar: {
      background: themeColors.white,
      textColor: themeColors.secondary,
      dividerBg: '#f2f5f9',
      menuItemColor: '#242E6F',
      menuItemColorActive: themeColors.primary,
      menuItemBg: themeColors.white,
      menuItemBgActive: '#f2f5f9',
      menuItemIconColor: lighten(themeColors.secondary, 0.3),
      menuItemIconColorActive: themeColors.primary,
      menuItemHeadingColor: darken(themeColors.secondary, 0.3),
    },
  },
  alpha: {
    white: {
      5: alpha(themeColors.white, 0.02),
      10: alpha(themeColors.white, 0.1),
      30: alpha(themeColors.white, 0.3),
      50: alpha(themeColors.white, 0.5),
      70: alpha(themeColors.white, 0.7),
      100: themeColors.white,
    },
    trueWhite: {
      5: alpha(themeColors.white, 0.02),
      10: alpha(themeColors.white, 0.1),
      30: alpha(themeColors.white, 0.3),
      50: alpha(themeColors.white, 0.5),
      70: alpha(themeColors.white, 0.7),
      100: themeColors.white,
    },
    black: {
      5: alpha(themeColors.black, 0.02),
      10: alpha(themeColors.black, 0.1),
      30: alpha(themeColors.black, 0.3),
      50: alpha(themeColors.black, 0.5),
      70: alpha(themeColors.black, 0.7),
      100: themeColors.black,
    },
  },
  secondary: {
    lighter: lighten(themeColors.secondary, 0.85),
    light: lighten(themeColors.secondary, 0.25),
    main: themeColors.secondary,
    dark: darken(themeColors.secondary, 0.2),
  },
  primary: {
    lighter: lighten(themeColors.primary, 0.85),
    light: lighten(themeColors.primary, 0.3),
    main: themeColors.primary,
    dark: darken(themeColors.primary, 0.2),
  },
  success: {
    lighter: lighten(themeColors.success, 0.85),
    light: lighten(themeColors.success, 0.3),
    main: themeColors.success,
    dark: darken(themeColors.success, 0.2),
  },
  warning: {
    lighter: lighten(themeColors.warning, 0.85),
    light: lighten(themeColors.warning, 0.3),
    main: themeColors.warning,
    dark: darken(themeColors.warning, 0.2),
  },
  error: {
    lighter: lighten(themeColors.error, 0.85),
    light: lighten(themeColors.error, 0.3),
    main: themeColors.error,
    dark: darken(themeColors.error, 0.2),
  },
  info: {
    lighter: lighten(themeColors.info, 0.85),
    light: lighten(themeColors.info, 0.3),
    main: themeColors.info,
    dark: darken(themeColors.info, 0.2),
  },
};
export const mytheme = createTheme({
  //   palette: {
  // primary: {
  //   main: themeColors.primary,
  // },
  //   },
  typography: {
    fontFamily: '"Public Sans", sans-serif, "Inter", "Roboto", -apple-system',
    h6: {
      color: blue[800],
      fontWeight: 600,
      fontSize: '1.4rem',
    },
  },
  components: {
    MuiIconButton: {
      defaultProps: {
        color: 'primary',
      },
    },
    MuiButton: {
      defaultProps: {
        color: 'primary',
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '0.875rem',
          borderRadius: '10px',
          fontWeight: '700',
          boxShadow: '0px 5px 12px rgba(0, 127, 255, 0.4)',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h6: 'div',
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        color: 'transparent',
        elevation: 0,
        sx: {
          backgroundImage: 'linear-gradient(100.66deg, rgba(255,255,255,0.7) 6.56%, rgba(255,255,255,0.9) 93.57%)',
          backdropFilter: 'blur(5px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          //   backgroundColor: '#f3F6F9',
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          position: 'fixed',
          bottom: '1rem',
          right: '1rem',
          zIndex: '1000',
        },
      },
    },
  },
});
