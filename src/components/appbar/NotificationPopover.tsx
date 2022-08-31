import {
  Avatar,
  Box,
  Button,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Popover,
  PopoverProps,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import Divider from '../Divider';
import { popoverDefaultProps } from './AppBar';
import { createTextAvatar, createModuleAvatar } from '../../utils/createAvatar';

interface NotificationList {
  module: string;
  title: string;
  content: string;
  time: Date;
}

const NotificationPopover = (props: PopoverProps) => {
  const theme = useTheme();
  return (
    <Popover {...props} sx={{ mt: 2 }}>
      <Box width={350}>
        <Box>
          <Typography>Notifikasi</Typography>
          <Typography>Terdapat 10 notifikasi belum dibaca</Typography>
        </Box>
        <Divider />
        <Box>
          <List>
            {[
              {
                module: 'token',
                title: 'Pembelian Token',
                content: 'Permintaan pembelian token baru',
                time: Date.now(),
              },
            ].map((item, key) => {
              const avatar = createModuleAvatar(item.module);
              return (
                <ListItemButton key={key}>
                  <Stack direction='row'>
                    <Avatar sx={{ backgroundColor: avatar.color }}>
                      <Icon>{avatar.icon}</Icon>
                    </Avatar>
                    <Stack>
                      <Typography variant='body2'>{item.title}</Typography>
                      <Typography variant='caption'>{item.content}</Typography>
                      <Typography variant='caption'>{item.time}</Typography>
                    </Stack>
                  </Stack>
                </ListItemButton>
              );
            })}
          </List>
        </Box>
        <Divider />
        <Box>
          <Button fullWidth sx={{ height: theme.spacing(7) }}>
            Lihat Semua
          </Button>
        </Box>
      </Box>
    </Popover>
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
