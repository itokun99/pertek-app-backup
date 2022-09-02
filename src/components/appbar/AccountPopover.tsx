import { Box, List, ListItemButton, Popover, PopoverProps, Typography, useTheme } from '@mui/material';
import Divider from '../Divider';
import { PopoverButtonBox, PopoverHeaderBox } from './AppBar';

const AccountPopover = (props: PopoverProps) => {
  const theme = useTheme();

  return (
    <Popover {...props} sx={{ mt: 2 }}>
      <Box sx={{ width: 200 }}>
        <PopoverHeaderBox>
          <Typography variant='subtitle1'>Syamsul</Typography>
          <Typography variant='subtitle3' color={theme.palette.text.secondary}>
            081803663156
          </Typography>
        </PopoverHeaderBox>
        <Divider />
        <PopoverButtonBox>
          <List>
            <ListItemButton>My Profile</ListItemButton>
            <ListItemButton>Pengaturan</ListItemButton>
          </List>
        </PopoverButtonBox>
        <Divider />
        <PopoverButtonBox>
          <List>
            <ListItemButton>Logout</ListItemButton>
          </List>
        </PopoverButtonBox>
      </Box>
    </Popover>
  );
};

AccountPopover.defaultProps = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right',
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'right',
  },
};

export default AccountPopover;
