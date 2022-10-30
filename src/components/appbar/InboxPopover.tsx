import Popover, { PopoverProps } from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

const InboxPopover = (props: PopoverProps) => {
  return (
    <Popover {...props} sx={{ mt: 2 }}>
      <Typography>Notifications</Typography>
    </Popover>
  );
};

InboxPopover.defaultProps = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right',
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'right',
  },
};

export default InboxPopover;
