import { Popover, PopoverProps, Typography } from '@mui/material';

const InboxPopover = (props: PopoverProps) => {
  return (
    <Popover {...props}>
      <Typography>Notifications</Typography>
    </Popover>
  );
};

InboxPopover.defaultProps = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left',
  },
};

export default InboxPopover;
