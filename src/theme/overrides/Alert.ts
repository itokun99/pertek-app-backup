import { Color, MyColor, Theme } from '@mui/material';
import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from './CustomIcons';

// ----------------------------------------------------------------------

enum ColorOptions {
  primary = 'primary',
  secondary = 'secondary',
  info = 'info',
  success = 'success',
  warning = 'warning',
  error = 'error',
}

export default function Alert(theme: Theme) {
  const isLight = theme.palette.mode === 'light';

  const standardStyle = (color: ColorOptions) => ({
    color: theme.palette[color][isLight ? 'darker' : 'lighter'],
    backgroundColor: theme.palette[color][isLight ? 'lighter' : 'darker'],
    '& .MuiAlert-icon': {
      color: theme.palette[color][isLight ? 'main' : 'light'],
    },
  });

  const filledStyle = (color: ColorOptions) => ({
    color: theme.palette[color].contrastText,
  });

  const outlinedStyle = (color: ColorOptions) => ({
    color: theme.palette[color][isLight ? 'darker' : 'lighter'],
    border: `solid 1px ${theme.palette[color][isLight ? 'light' : 'dark']}`,
    backgroundColor: theme.palette[color][isLight ? 'lighter' : 'darker'],
    '& .MuiAlert-icon': {
      color: theme.palette[color][isLight ? 'main' : 'light'],
    },
  });

  return {
    MuiAlert: {
      defaultProps: {
        iconMapping: {
          info: <InfoIcon />,
          success: <SuccessIcon />,
          warning: <WarningIcon />,
          error: <ErrorIcon />,
        },
      },

      styleOverrides: {
        message: {
          '& .MuiAlertTitle-root': {
            marginBottom: theme.spacing(0.5),
          },
        },
        action: {
          '& button:not(:first-of-type)': {
            marginLeft: theme.spacing(1),
          },
        },

        standardInfo: standardStyle(ColorOptions.info),
        standardSuccess: standardStyle(ColorOptions.success),
        standardWarning: standardStyle(ColorOptions.warning),
        standardError: standardStyle(ColorOptions.error),

        filledInfo: filledStyle(ColorOptions.info),
        filledSuccess: filledStyle(ColorOptions.success),
        filledWarning: filledStyle(ColorOptions.warning),
        filledError: filledStyle(ColorOptions.error),

        outlinedInfo: outlinedStyle(ColorOptions.info),
        outlinedSuccess: outlinedStyle(ColorOptions.success),
        outlinedWarning: outlinedStyle(ColorOptions.warning),
        outlinedError: outlinedStyle(ColorOptions.error),
      },
    },
  };
}
