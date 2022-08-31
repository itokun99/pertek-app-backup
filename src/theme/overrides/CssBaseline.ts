// ----------------------------------------------------------------------

import { GREY, INFO } from '../palette';

export default function CssBaseline() {
  return {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
        },
        html: {
          width: '100%',
          height: '100%',
          WebkitOverflowScrolling: 'touch',
          scrollbarGutter: 'stable both-edges',
        },
        ':hover': {
          '::-webkit-scrollbar-thumb': {
            backgroundColor: GREY[500_48],
          },
        },
        body: {
          width: '100%',
          height: '100%',
        },
        '#__next': {
          width: '100%',
          height: '100%',
        },
        '::-webkit-scrollbar': {
          width: '6px',
        },
        '::-webkit-scrollbar-thumb': {
          position: 'absolute',
          backgroundColor: 'transparent',
          borderRadius: '16px',
        },
        input: {
          '&[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
            '&::-webkit-inner-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
          },
        },
        img: {
          display: 'block',
          maxWidth: '100%',
        },
      },
    },
  };
}
