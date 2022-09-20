import { Box, List, ListItemButton, Popover, PopoverProps, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { UserModel } from '../../provider/AuthProvider';
import Divider from '../Divider';
import { PopoverButtonBox, PopoverHeaderBox } from './AppBar';

export type AccountPopoverProps = PopoverProps & {
  user: UserModel;
};

const AccountPopover = ({ user, ...rest }: AccountPopoverProps) => {
  console.log('account re-render');
  const theme = useTheme();
  const router = useRouter();
  const { username, phone_number } = user!;

  const handleLogout = async (e: any) => {
    e.preventDefault();
    const res = await fetch('/api/logout', {
      method: 'POST',
    });

    if (res.ok) {
      router.replace('/login');
    }
  };

  let name = '';
  if (username) {
    name = `${username.charAt(0).toLocaleUpperCase()}${username.substring(1, username.length)}`;
  }

  return (
    <Popover {...rest} sx={{ mt: 2 }}>
      <Box sx={{ width: 200 }}>
        <PopoverHeaderBox>
          <Typography variant='subtitle1'>{name}</Typography>
          <Typography variant='subtitle3' color={theme.palette.text.secondary}>
            {phone_number}
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
            <ListItemButton onClick={handleLogout}>Logout</ListItemButton>
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
