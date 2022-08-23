import {
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  styled,
  Box,
  Grid,
  IconButton,
  useTheme,
  DrawerProps,
  CSSObject,
  Theme,
} from '@mui/material';
import { ArrowBackIos, Inbox, KeyboardDoubleArrowLeft, Mail } from '@mui/icons-material';
import { useState } from 'react';

interface MyDrawerProps extends DrawerProps {
  width?: number;
}

const openedMixin = (theme: Theme): CSSObject => ({
  width: 280,
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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })<MyDrawerProps>(
  ({ theme, open }) => ({
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': {
        ...openedMixin(theme),
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

export interface SidebarProps {
  width?: number;
}

interface SidebarHeaderProps {
  open: boolean;
  setOpen: (state: boolean) => void;
}

const SidebarHeader = ({ open, setOpen }: SidebarHeaderProps) => {
  const theme = useTheme();
  return (
    <Grid
      container
      sx={{
        px: theme.spacing(3),
      }}
    >
      <Grid item flex={1}>
        Propertek
      </Grid>
      <Grid item>
        <IconButton onClick={() => setOpen(!open)}>
          <KeyboardDoubleArrowLeft />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export const Sidebar = ({ width }: SidebarProps) => {
  const [open, setOpen] = useState(true);
  return (
    <Drawer variant='permanent' open>
      <Box>
        <SidebarHeader open={open} setOpen={setOpen} />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <Inbox /> : <Mail />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
