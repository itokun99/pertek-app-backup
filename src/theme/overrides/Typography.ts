// ----------------------------------------------------------------------

import { Theme } from '@mui/material';

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    subtitle3: true;
  }
}

export default function Typography(theme: Theme) {
  return {
    MuiTypography: {
      styleOverrides: {
        paragraph: {
          marginBottom: theme.spacing(2),
        },
        gutterBottom: {
          marginBottom: theme.spacing(1),
        },
        subtitle3: {
          color: theme.palette.grey[400],
        },
      },
    },
  };
}
