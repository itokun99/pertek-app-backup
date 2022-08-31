import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Popover,
  PopoverProps,
  Typography,
} from '@mui/material';
import Divider from '../Divider';
import { popoverDefaultProps } from './AppBar';

interface NotificationList {}

const NotificationPopover = (props: PopoverProps) => {
  return (
    <Popover {...props}>
      <Box width={230}>
        <Box>
          <Typography>Notifikasi</Typography>
          <Typography>Terdapat 10 notifikasi belum dibaca</Typography>
        </Box>
        <Divider />
        <Box>
          <List>
            <ListSubheader>BARU</ListSubheader>
            {[1, 2, 3, 4, 5, 10].map((_, key) => (
              <ListItemButton key={key}>
                <Typography>hello</Typography>
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Box>
    </Popover>
  );
};

NotificationPopover.defaultProps = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left',
  },
};

export default NotificationPopover;
