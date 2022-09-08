import {
  alpha,
  Avatar,
  Box,
  Button,
  Grid,
  Icon,
  IconButton,
  List,
  ListItemButton,
  Popover,
  PopoverProps,
  Stack,
  Theme,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import Divider from '../Divider';
import { createModuleAvatar } from '../../utils/createAvatar';
import { AccessTime, DoneAll } from '@mui/icons-material';
import { fToNow } from '../../utils/formatTime';
import SimpleBar from 'simplebar-react';
import { PropsWithChildren, useContext } from 'react';
import { NotificationContext, NotificationItem } from '../../provider/NotificationProvider';

const NotificationPopover = (props: PopoverProps) => {
  const theme = useTheme();
  const { notifications, setIsRead } = useContext(NotificationContext);
  return (
    <Popover {...props} sx={{ mt: 2 }}>
      <Box width={350}>
        <Box p={2}>
          <Grid container alignItems='center'>
            <Grid item flexGrow={1}>
              <Typography variant='subtitle1'>Notifikasi</Typography>
              <Typography variant='body2' color={theme.palette.text.secondary}>
                {notifications &&
                  notifications.length > 0 &&
                  `Anda memiliki ${notifications.length} notifikasi belum dibaca`}
                {notifications === undefined && `Anda belum memiliki notifikasi`}
              </Typography>
            </Grid>
            <Grid>
              <Tooltip title='Tandai semua'>
                <IconButton
                  onClick={() => setIsRead()}
                  sx={{ backgroundColor: theme.palette.grey[100], color: theme.palette.success.main }}
                >
                  <DoneAll />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <Box p={0} m={0}>
          {notifications && notifications.length > 0 && (
            <SimpleBar style={{ maxHeight: '55vh' }}>
              <List disablePadding>
                {notifications.map((notif, key) => (
                  <NotificationListItem key={key} item={notif} theme={theme} />
                ))}
              </List>
            </SimpleBar>
          )}
        </Box>
        <Divider />
        <Box p={1}>
          <Button fullWidth>Lihat Semua</Button>
        </Box>
      </Box>
    </Popover>
  );
};

const NotificationListItem = ({ item, theme }: PropsWithChildren & { item: NotificationItem; theme: Theme }) => {
  const avatar = createModuleAvatar(item.module);
  const { setIsRead } = useContext(NotificationContext);
  return (
    <ListItemButton
      onClick={(e) => {
        e.preventDefault();
        setIsRead(item.id);
      }}
      sx={{
        borderRadius: 0,
        mb: 0.2,
        ...(!item.isRead && { backgroundColor: alpha(theme.palette.info.main, 0.2) }),
      }}
    >
      <Stack direction='row' alignItems='center'>
        <Avatar sx={{ mr: 2, backgroundColor: theme.palette.grey[200] }}>
          <Icon sx={{ color: avatar.color }}>{avatar.icon}</Icon>
        </Avatar>
        <Stack>
          <Typography variant='subtitle2'>
            {item.title}{' '}
            <Typography component='span' variant='body2' color={theme.palette.text.secondary} fontSize='0.875rem'>
              {item.content}
            </Typography>
          </Typography>
          <Stack direction='row' alignItems='center'>
            <AccessTime style={{ justifyItems: 'center' }} sx={{ fontSize: 16, color: theme.palette.grey[500] }} />
            <Typography ml={0.5} variant='caption' color={theme.palette.grey[500]}>
              {fToNow(item.time.toString())}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </ListItemButton>
  );
};

NotificationPopover.defaultProps = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right',
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'right',
  },
};

export default NotificationPopover;
