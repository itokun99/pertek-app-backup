import { Box, Popover, PopoverProps } from '@mui/material';
import { popoverDefaultProps } from './AppBar';

const NotificationPopover = (props: PopoverProps) => {
  return (
    <Popover {...props}>
      <Box width={230}>Notification</Box>
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
