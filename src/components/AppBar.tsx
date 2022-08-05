import { useRouter } from 'next/router';
import { useContext } from 'react';

import { AppBar, Toolbar, Typography, Button, Box, Container, IconButton, Tooltip, Avatar } from '@mui/material';
import AppsIcon from '@mui/icons-material/Apps';
import { AuthContext } from '../context/AuthContext';

export const AppBarComponent = () => {
  const router = useRouter();
  const { isLoggedIn } = useContext(AuthContext);

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <AppBar position='sticky'>
      <Container maxWidth='xl'>
        <Toolbar variant='dense' disableGutters>
          <IconButton>
            <AppsIcon />
          </IconButton>
          <Typography variant='h6' sx={{ flexGrow: 1 }}>
            Propertek
          </Typography>

          <Box>
            <Tooltip title='My Menu'>
              <IconButton>
                <Avatar src='/static/images/4.jpg' />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
