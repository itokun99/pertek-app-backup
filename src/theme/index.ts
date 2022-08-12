import { alpha, createTheme, darken, lighten, colors, PaletteOptions, Palette } from '@mui/material';
import palette, { PRIMARY } from './palette';
import typography from './typography';

import ComponentsOverrides from './overrides';
import shadows, { createShadow, customShadows, LIGHT_MODE } from './shadows';

import type {} from '@mui/x-data-grid/themeAugmentation';
import { TypographyOptions, TypographyStyleOptions } from '@mui/material/styles/createTypography';

declare module '@mui/material/styles' {
  interface Theme {
    customShadows: {
      z1: string;
      z8: string;
      z12: string;
      z16: string;
      z20: string;
      z24: string;
      //
      primary: string;
      info: string;
      secondary: string;
      success: string;
      warning: string;
      error: string;
      //
      card: string;
      dialog: string;
      dropdown: string;
    };
  }

  interface Color {
    500_8: (color: string, opacity: number) => string;
    500_12: (color: string, opacity: number) => string;
    500_16: (color: string, opacity: number) => string;
    500_24: (color: string, opacity: number) => string;
    500_32: (color: string, opacity: number) => string;
    500_48: (color: string, opacity: number) => string;
    500_56: (color: string, opacity: number) => string;
    500_80: (color: string, opacity: number) => string;
  }

  interface ThemeOptions {
    palette?: PaletteOptions;
    customShadows?: {
      z1?: string;
      z8?: string;
      z12?: string;
      z16?: string;
      z20?: string;
      z24?: string;
      //
      primary?: string;
      info?: string;
      secondary?: string;
      success?: string;
      warning?: string;
      error?: string;
      //
      card?: string;
      dialog?: string;
      dropdown?: string;
    };
  }
}

// export const mytheme = createTheme({
//   palette: {
//     primary: {
//       main: PRIMARY.main,
//       light: PRIMARY.light,
//       dark: PRIMARY.dark,
//     },
//   },
//   typography: {
//     fontFamily: '"Public Sans", sans-serif, "Inter", "Roboto", -apple-system',
//     h6: {
//       color: blue[800],
//       fontWeight: 600,
//       fontSize: '1.4rem',
//     },
//     caption: {
//       fontSize: '0.875rem',
//       // color: theColors.alpha.black[50],
//     },
//   },
//   components: {
//     MuiIconButton: {
//       defaultProps: {
//         color: 'primary',
//       },
//     },
//     MuiButton: {
//       defaultProps: {
//         color: 'primary',
//       },
//       styleOverrides: {
//         root: {
//           textTransform: 'none',
//           fontSize: '0.875rem',
//           borderRadius: '10px',
//           fontWeight: '700',
//           boxShadow: '0px 5px 12px rgba(0, 127, 255, 0.4)',
//           '&:hover': {
//             boxShadow: 'none',
//           },
//         },
//       },
//     },
//     MuiTypography: {
//       defaultProps: {
//         variantMapping: {
//           h6: 'div',
//         },
//       },
//     },
// MuiAppBar: {
//   defaultProps: {
//     color: 'transparent',
//     elevation: 0,
//     sx: {
//       backgroundImage: 'linear-gradient(100.66deg, rgba(255,255,255,0.7) 6.56%, rgba(255,255,255,0.9) 93.57%)',
//       backdropFilter: 'blur(5px)',
//       borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
//     },
//   },
// },
//     MuiTab: {
//       styleOverrides: {
//         root: {
//           textTransform: 'capitalize',
//           fontWeight: 700,
//         },
//       },
//       defaultProps: {
//         disableRipple: true,
//       },
//     },
//     MuiFab: {
//       styleOverrides: {
//         root: {
//           position: 'fixed',
//           bottom: '1rem',
//           right: '1rem',
//           zIndex: '1000',
//         },
//       },
//     },
//   },
// });

const MyTheme = createTheme({
  palette: palette.light as unknown as PaletteOptions,
  typography: typography as unknown as TypographyOptions,
  shape: { borderRadius: 8 },
  shadows: shadows.light,
  customShadows: customShadows.light,
});

MyTheme.components = ComponentsOverrides(MyTheme);

export default MyTheme;
