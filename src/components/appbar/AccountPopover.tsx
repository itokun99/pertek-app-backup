import { Box, List, ListItemButton, Popover, PopoverProps, Typography, useTheme } from '@mui/material';
import Divider from '../Divider';
import { PopoverButtonBox, PopoverHeaderBox } from './AppBar';

const AccountPopover = (props: PopoverProps) => {
  const theme = useTheme();

  return (
    <Popover
      {...props}
      sx={{
        mt: 2,
      }}
    >
      <Box
        sx={{
          minWidth: 200,
          maxWidth: 300,
        }}
      >
        <PopoverHeaderBox>
          <Typography variant='body2' sx={{ fontWeight: 500 }}>
            Syamsul
          </Typography>
          <Typography variant='body2' sx={{ fontSize: '0.8rem', color: theme.palette.text.secondary }}>
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
    horizontal: 'left',
  },
};

export default AccountPopover;
