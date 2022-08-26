import { styled, Drawer as MuiDrawer, Theme, CSSObject, DrawerProps } from '@mui/material';

export interface DrawerStyleProps {
  width: number;
}

const openedMixin = (theme: Theme, width: number): CSSObject => ({
  width: width,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const DrawerStyle = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })<DrawerStyleProps>(
  ({ theme, open, width }) => ({
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme, width),
      '& .MuiDrawer-paper': {
        ...openedMixin(theme, width),
        borderRight: `1px dashed ${theme.palette.grey[300]}`,
      },
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': {
        ...closedMixin(theme),
        borderRight: `1px dashed ${theme.palette.grey[300]}`,
      },
    }),
  })
);

export const Drawer = (props: DrawerProps & DrawerStyleProps) => <DrawerStyle {...props}></DrawerStyle>;
