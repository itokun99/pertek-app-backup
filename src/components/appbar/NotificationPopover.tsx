import { Box, Popover, PopoverProps, Typography } from '@mui/material';
import Divider from '../Divider';
import { popoverDefaultProps } from './AppBar';

const NotificationPopover = (props: PopoverProps) => {
  return (
    <Popover {...props}>
      <Box width={230}>
        <Box>
          <Typography>Notifikasi</Typography>
          <Typography>Terdapat 10 notifikasi belum dibaca</Typography>
        </Box>
        <Divider />
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
