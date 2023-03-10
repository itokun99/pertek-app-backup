import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Popover, { PopoverProps } from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AuthContext } from '@provider/AuthProvider';
import Divider from '../Divider';
import { PopoverButtonBox, PopoverHeaderBox } from './AppBar';

export type UserAccount = {
  username?: string;
  phoneNumber?: string;
};

const AccountPopover = (props: PopoverProps) => {
  const theme = useTheme();
  const router = useRouter();

  const { user } = useContext(AuthContext);

  const handleLogout = async (e: any) => {
    e.preventDefault();
    const res = await fetch('/api/logout', {
      method: 'POST',
    });

    if (res.ok) {
      router.replace('/login');
      if (window) {
        window.localStorage.removeItem('activeProperty');
      }
    }
  };

  let name = '';
  if (user?.username) {
    name = `${user.username.charAt(0).toLocaleUpperCase()}${user.username.substring(1, user.username.length)}`;
  }

  return (
    <Popover {...props} sx={{ mt: 2 }}>
      <Box sx={{ width: 200 }}>
        <PopoverHeaderBox>
          <Typography variant='subtitle1'>{name}</Typography>
          <Typography variant='subtitle3' color={theme.palette.text.secondary}>
            {user?.phone_number}
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
