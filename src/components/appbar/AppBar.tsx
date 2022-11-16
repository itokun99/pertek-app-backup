import { Person } from '@mui/icons-material';
import WifiOffOutlined from '@mui/icons-material/WifiOffOutlined';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { AuthContext } from '@provider/AuthProvider';
import { NetworkContext } from '@provider/NetworkProvider';
import { NotificationContext } from '@provider/NotificationProvider';
import { PropsWithChildren, useContext, useState } from 'react';
import AccountPopover from './AccountPopover';

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

const AppBarComponent = () => {
  const theme = useTheme();
  const { unreadCount } = useContext(NotificationContext);
  const { user } = useContext(AuthContext);
  const { isBrowserSupported, isOnline } = useContext(NetworkContext);

  const [popover, setPopover] = useState<PopoverState | null>(null);

  const mountPopover = (e: MouseEvent, name: 'account' | 'notif' | 'inbox') => {
    setPopover({
      name,
      anchor: e.currentTarget,
    } as PopoverState);
  };

  const unmountPopover = () => setPopover(null);

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
          <Stack direction='row' gap={2} alignItems='center'>
            {isBrowserSupported && !isOnline && (
              <Tooltip title='Tidak ada koneksi internet'>
                <WifiOffOutlined sx={{ color: theme.palette.grey[500] }} />
              </Tooltip>
            )}
            {/* <Box
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
            <Box>
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
            <NotificationPopover anchorEl={popover?.anchor} open={popover?.name === 'notif'} onClose={unmountPopover} /> */}

            <Box>
              <IconButton
                aria-label='My Profile Button'
                sx={{
                  p: 0,
                }}
                onClick={(e: any) => {
                  mountPopover(e, 'account');
                }}
              >
                <Avatar src={user?.avatar} alt='profile avatar'>
                  <Person />
                </Avatar>
              </IconButton>
            </Box>
            <AccountPopover anchorEl={popover?.anchor} open={popover?.name === 'account'} onClose={unmountPopover} />
          </Stack>
        </Toolbar>
      </Grid>
    </AppBar>
  );
};

export default AppBarComponent;
