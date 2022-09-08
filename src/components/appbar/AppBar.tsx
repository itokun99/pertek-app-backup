import { useRouter } from 'next/router';
import { PropsWithChildren, useContext, useState } from 'react';

import { AppBar, Toolbar, Box, IconButton, Avatar, Grid, useTheme, Badge } from '@mui/material';
import { AuthContext } from '../../provider/AuthProvider';
import { Mail, Notifications } from '@mui/icons-material';
import { motion } from 'framer-motion';
import NotificationPopover from './NotificationPopover';
import InboxPopover from './InboxPopover';
import AccountPopover from './AccountPopover';
import { NotificationContext } from '../../provider/NotificationProvider';

export const popoverDefaultProps = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right',
  },
};

const boxVariant = {
  hover: {
    scale: 1.1,
  },
  tap: {
    scale: 0.95,
  },
};

export const PopoverButtonBox = ({ children }: PropsWithChildren) => <Box sx={{ px: 1 }}>{children}</Box>;
export const PopoverHeaderBox = ({ children }: PropsWithChildren) => <Box sx={{ px: 2.5, py: 2 }}>{children}</Box>;

interface PopoverState {
  name: 'account' | 'notif' | 'inbox';
  anchor: HTMLElement | null;
}

export const AppBarComponent = () => {
  const router = useRouter();
  const theme = useTheme();
  const { user } = useContext(AuthContext);
  const { unreadCount } = useContext(NotificationContext);

  const [popover, setPopover] = useState<PopoverState | null>(null);

  const mountPopover = (e: MouseEvent, name: 'account' | 'notif' | 'inbox') => {
    setPopover({
      name,
      anchor: e.currentTarget,
    } as PopoverState);
  };

  const unmountPopover = () => {
    setPopover(null);
  };

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
            onClick={(e: any) => {
              mountPopover(e, 'inbox');
            }}
          >
            <IconButton aria-label='inbox button'>
              <Badge max={9} overlap='circular' color='error'>
                <Mail />
              </Badge>
            </IconButton>
          </Box>
          <InboxPopover open={popover?.name === 'inbox'} anchorEl={popover?.anchor} onClose={unmountPopover} />
          <Box
            component={motion.div}
            whileTap='tap'
            whileHover='hover'
            variants={boxVariant}
            sx={{ ml: theme.spacing(2) }}
          >
            <IconButton
              aria-label='Notification Button'
              onClick={(e: any) => {
                mountPopover(e, 'notif');
              }}
            >
              <Badge invisible={unreadCount <= 0} badgeContent={unreadCount} max={9} overlap='circular' color='error'>
                <Notifications />
              </Badge>
            </IconButton>
          </Box>
          <NotificationPopover anchorEl={popover?.anchor} open={popover?.name === 'notif'} onClose={unmountPopover} />

          <Box sx={{ mx: 2 }} component={motion.div} whileTap='tap' variants={boxVariant} whileHover='hover'>
            <IconButton
              aria-label='My Profile Button'
              sx={{
                p: 0,
              }}
              onClick={(e: any) => {
                mountPopover(e, 'account');
              }}
            >
              <Avatar src={user?.avatar ?? '/static/images/4.jpg'} alt='profile avatar' />
            </IconButton>
          </Box>
          <AccountPopover
            username={user?.username ?? ''}
            phoneNumber={user?.phoneNumber ?? ''}
            anchorEl={popover?.anchor}
            open={popover?.name === 'account'}
            onClose={unmountPopover}
          />
        </Toolbar>
      </Grid>
    </AppBar>
  );
};
