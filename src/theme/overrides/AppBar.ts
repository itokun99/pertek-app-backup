import { alpha, Theme } from '@mui/material';

export default function AppBar(theme: Theme) {
  return {
    MuiAppBar: {
      defaultProps: {
        color: 'transparent',
        elevation: 0,
        sx: {
          backgroundImage: `linear-gradient(0deg, ${alpha(theme.palette.common.white, 0.7)} 6.56%, ${alpha(
            theme.palette.common.white,
            0.9
          )} 93.57%)`,
          backdropFilter: 'blur(5px)',
        },
      },
    },
  };
}
