// ----------------------------------------------------------------------

import { Theme } from '@mui/material/styles';

export default function Paper(theme: Theme) {
  theme.components;

  return {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },

      variants: [
        {
          props: { variant: 'outlined' },
          style: { borderColor: theme.palette.grey[500_12] },
        },
      ],

      styleOverrides: {
        root: {
          backgroundImage: 'none',
          scrollbarGutter: 'stable',
          ':hover': {
            '::-webkit-scrollbar-thumb': {
              backgroundColor: theme.palette.grey[500_32],
            },
          },
        },
      },
    },
  };
}
