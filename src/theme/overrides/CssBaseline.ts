// ----------------------------------------------------------------------

import { PRIMARY } from '../palette';

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
        },
        body: {
          width: '100%',
          height: '100%',
          padding: 0,
          margin: 0,
        },
        '#__next': {
          width: '100%',
          height: '100%',
        },
        '.simplebar-track.simplebar-vertical .simplebar-scrollbar:before': {
          backgroundImage: `linear-gradient(${PRIMARY.light}, ${PRIMARY.dark})`,
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
