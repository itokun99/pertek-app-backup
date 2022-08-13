import { alpha, createTheme, darken, lighten, colors, PaletteOptions, Palette, Color } from '@mui/material';
import palette, { PRIMARY } from './palette';
import typography from './typography';

import ComponentsOverrides from './overrides';
import shadows, { createShadow, customShadows, LIGHT_MODE } from './shadows';

import type {} from '@mui/x-data-grid/themeAugmentation';
import { TypographyOptions, TypographyStyleOptions } from '@mui/material/styles/createTypography';

declare module '@mui/material/styles' {
  interface Theme {
    palette: MyPalette;
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

  interface MyColor extends Color {
    500_8: (color: string, opacity: number) => string;
    500_12: (color: string, opacity: number) => string;
    500_16: (color: string, opacity: number) => string;
    500_24: (color: string, opacity: number) => string;
    500_32: (color: string, opacity: number) => string;
    500_48: (color: string, opacity: number) => string;
    500_56: (color: string, opacity: number) => string;
    500_80: (color: string, opacity: number) => string;
  }

  interface MyPalette extends Palette {
    grey: MyColor;
  }

  interface MyColorPartial extends Partial<Color> {
    500_8: (color: string, opacity: number) => string;
    500_12: (color: string, opacity: number) => string;
    500_16: (color: string, opacity: number) => string;
    500_24: (color: string, opacity: number) => string;
    500_32: (color: string, opacity: number) => string;
    500_48: (color: string, opacity: number) => string;
    500_56: (color: string, opacity: number) => string;
    500_80: (color: string, opacity: number) => string;
  }

  interface MyPaletteOptions extends PaletteOptions {
    grey?: MyColorPartial;
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

const MyTheme = createTheme({
  palette: palette.light as unknown as PaletteOptions,
  typography: typography as unknown as TypographyOptions,
  shape: { borderRadius: 8 },
  shadows: shadows.light,
  customShadows: customShadows.light,
});

MyTheme.components = ComponentsOverrides(MyTheme);

export default MyTheme;
