import { Popover, PopoverProps } from '@mui/material';

const InboxPopover = (props: PopoverProps) => {
  return <Popover {...props}></Popover>;
};

InboxPopover.defaultProps = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left',
  },
};

export default InboxPopover;
