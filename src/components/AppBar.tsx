import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Tooltip,
  Avatar,
  Grid,
  Theme,
  useTheme,
  StyledComponentProps,
  Popover,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { Inbox, Mail, Message, Notifications } from '@mui/icons-material';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const boxVariant = {
  hover: {
    scale: 1.1,
  },
  tap: {
    scale: 0.95,
  },
};

export const AppBarComponent = () => {
  const router = useRouter();
  const theme = useTheme();
  const { isLoggedIn } = useContext(AuthContext);

  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <AppBar position='fixed'>
      <Grid
        container
        sx={{
          justifyContent: 'flex-end',
          paddingX: theme.spacing(4),
          paddingY: theme.spacing(1),
        }}
      >
        <Toolbar variant='dense' disableGutters>
          <Box
            component={motion.div}
            whileHover='hover'
            whileTap='tap'
            variants={boxVariant}
            sx={{
              display: 'inline-flex',
            }}
          >
            <IconButton>
              <Mail />
            </IconButton>
          </Box>
          <Box
            component={motion.div}
            whileTap='tap'
            whileHover='hover'
            variants={boxVariant}
            sx={{ ml: theme.spacing(2) }}
          >
            <IconButton>
              <Notifications />
            </IconButton>
          </Box>

          <Box
            sx={{ ml: theme.spacing(2) }}
            component={motion.div}
            whileTap='tap'
            variants={boxVariant}
            whileHover='hover'
          >
            <IconButton
              sx={{
                p: 0,
              }}
              onClick={(e: any) => setAnchor(e.currentTarget)}
            >
              <Avatar src='/static/images/4.jpg' />
            </IconButton>
          </Box>
          <Popover
            open={anchor !== null}
            anchorEl={anchor}
            onClose={() => setAnchor(null)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Box
              sx={{
                width: 200,
                padding: theme.spacing(2),
              }}
            >
              <Typography variant='subtitle2'>My Menu</Typography>
              <Divider variant='fullWidth' />
              <List sx={{ p: 0 }}>
                <ListItemButton sx={{ paddingX: 0 }}>
                  <ListItemText primary='Inbox' />
                </ListItemButton>
              </List>
            </Box>
          </Popover>
        </Toolbar>
      </Grid>
    </AppBar>
  );
};
