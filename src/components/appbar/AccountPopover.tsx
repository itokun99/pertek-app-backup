import { Box, List, ListItemButton, Popover, PopoverProps, Typography, useTheme } from '@mui/material';
import { UserModel } from '../../provider/AuthProvider';
import Divider from '../Divider';
import { PopoverButtonBox, PopoverHeaderBox } from './AppBar';

export type AccountPopoverProps = PopoverProps & {
  username: string;
  phoneNumber: string;
};

const AccountPopover = ({ username, phoneNumber, ...rest }: AccountPopoverProps) => {
  const theme = useTheme();

  return (
    <Popover {...rest} sx={{ mt: 2 }}>
      <Box sx={{ width: 200 }}>
        <PopoverHeaderBox>
          <Typography variant='subtitle1'>{username}</Typography>
          <Typography variant='subtitle3' color={theme.palette.text.secondary}>
            {phoneNumber}
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
