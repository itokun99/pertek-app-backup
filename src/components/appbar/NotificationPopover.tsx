import {
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
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import Divider from '../Divider';
import { createModuleAvatar } from '../../utils/createAvatar';
import { AccessTimeTwoTone, DoneAll } from '@mui/icons-material';
import { fToNow } from '../../utils/formatTime';
import SimpleBar from 'simplebar-react';
// import 'simplebar-react/dist/simplebar.min.css';

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
      <Box width={400}>
        <Box p={2}>
          <Grid container alignItems='center'>
            <Grid item flexGrow={1}>
              <Typography variant='subtitle1'>Notifikasi</Typography>
              <Typography variant='body2' color={theme.palette.text.secondary}>
                Anda memiliki 10 notifikasi belum dibaca
              </Typography>
            </Grid>
            <Grid>
              <Tooltip title='Tandai semua'>
                <IconButton sx={{ backgroundColor: theme.palette.grey[100], color: theme.palette.success.main }}>
                  <DoneAll />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <Box p={0} m={0}>
          <SimpleBar style={{ maxHeight: 260 }}>
            <List disablePadding>
              {[
                {
                  module: 'token',
                  title: 'Token Listrik',
                  content: 'Permintaan pembelian token baru',
                  time: new Date('2022-08-30'),
                },
                {
                  module: 'token',
                  title: 'Token Listrik',
                  content: 'Permintaan pembelian token baru',
                  time: new Date('2022-08-30'),
                },
                {
                  module: 'token',
                  title: 'Token Listrik',
                  content: 'Permintaan pembelian token baru',
                  time: new Date('2022-08-30'),
                },
                {
                  module: 'token',
                  title: 'Token Listrik',
                  content: 'Permintaan pembelian token baru',
                  time: new Date('2022-08-30'),
                },
                {
                  module: 'token',
                  title: 'Token Listrik',
                  content: 'Permintaan pembelian token baru',
                  time: new Date('2022-08-30'),
                },
              ].map((item, key) => {
                const avatar = createModuleAvatar(item.module);
                return (
                  <ListItemButton key={key} sx={{ borderRadius: 0 }}>
                    <Stack direction='row' alignItems='center'>
                      <Avatar sx={{ mr: 2, backgroundColor: theme.palette.grey[200] }}>
                        <Icon sx={{ color: avatar.color }}>{avatar.icon}</Icon>
                      </Avatar>
                      <Stack>
                        <Typography variant='subtitle2'>{item.title}</Typography>
                        <Typography variant='body2' color={theme.palette.text.secondary} fontSize='0.875rem'>
                          {item.content}
                        </Typography>
                        <Stack direction='row' alignItems='center'>
                          <AccessTimeTwoTone style={{ justifyItems: 'center' }} sx={{ fontSize: 16 }} />
                          <Typography
                            mt={1}
                            variant='caption'
                            sx={{ backgroundColor: '#ff0' }}
                            color={theme.palette.text.secondary}
                          >
                            {fToNow(item.time.toString())}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  </ListItemButton>
                );
              })}
            </List>
          </SimpleBar>
        </Box>
        <Divider />
        <Box p={1}>
          <Button fullWidth>Lihat Semua</Button>
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
