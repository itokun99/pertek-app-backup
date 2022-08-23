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
} from '@mui/material';
import { ArrowBackIos, Inbox, KeyboardDoubleArrowLeft, Mail } from '@mui/icons-material';
import { useState } from 'react';

interface MyDrawerProps extends DrawerProps {
  width?: number;
}

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })<MyDrawerProps>(
  ({ theme, open, width = 280 }) => ({
    flexShrink: 0,
    open,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    '& .MuiDrawer-paper': {
      width,
      borderRight: `1px dashed ${theme.palette.grey[300]}`,
    },
  })
);

export interface SidebarProps {
  width?: number;
}

const SidebarHeader = () => {
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
        <IconButton>
          <KeyboardDoubleArrowLeft />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export const Sidebar = ({ width }: SidebarProps) => {
  const [open, setOpen] = useState(true);
  return (
    <Drawer variant='permanent' open width={width}>
      <Box>
        <SidebarHeader />
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
