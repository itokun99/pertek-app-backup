// ----------------------------------------------------------------------
import { alpha, Theme } from '@mui/material/styles';

export default function Popover(theme: Theme) {
  return {
    MuiPopover: {
      styleOverrides: {
        paper: {
          // backgroundImage: alpha(theme.palette.common.white, 0.95),
          // backdropFilter: 'blur(50px)',
          // backgroundColor: 'transparent',
          boxShadow: theme.customShadows.dropdown,
          borderRadius: Number(theme.shape.borderRadius) * 1.5,
        },
      },
    },
  };
}
