// ----------------------------------------------------------------------

import { Theme, ThemeOptions } from '@mui/material';
import { Component } from 'react';

export default function Paper(theme: Theme) {
  theme.components;

  return {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
        borderRadius: theme.spacing(2),
      },

      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  } as ThemeOptions;
}
