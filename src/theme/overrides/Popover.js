// ----------------------------------------------------------------------
import { alpha } from '@mui/material';

export default function Popover(theme) {
  return {
    MuiPopover: {
      styleOverrides: {
        paper: {
          backgroundImage: alpha(theme.palette.common.white, 0.95),
          backdropFilter: 'blur(50px)',
          backgroundColor: 'transparent',
          boxShadow: theme.customShadows.dropdown,
          borderRadius: Number(theme.shape.borderRadius) * 1.5,
        },
      },
    },
  };
}
