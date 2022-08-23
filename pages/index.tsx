import { LoadingButton } from '@mui/lab';
import { Box, Container, Grid, InputAdornment, Stack, TextField, Typography, useTheme } from '@mui/material';
// import styles from '../styles/Home.module.css';

import { useContext, useState } from 'react';
import { AuthContext } from '../src/context/AuthContext';
import { useLogin } from '../lib/login';
import { useRouter } from 'next/router';
import { AccountCircle, Key } from '@mui/icons-material';
import Link from 'next/link';

const Home = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { changeState } = useContext(AuthContext);
  const router = useRouter();

  const theme = useTheme();

  const _handleLogin = async (e: any) => {
    e.preventDefault();
    const ok = await useLogin(username, password);
    if (ok) {
      changeState(true);
      router.replace('/dashboard');
    }
  };

  return (
    // <Container maxWidth='xs'>
    <Grid
      container
      sx={{
        minHeight: '100vh',
        alignContent: 'center',
        justifyContent: 'center',
        justifyItems: 'center',
      }}
    >
      <Stack rowGap={2}>
        <Typography variant='h4'>Propertek</Typography>
        <Typography variant='body1'>Best Indonesia Property Management System</Typography>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          variant='outlined'
          label='Username'
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Key />
              </InputAdornment>
            ),
          }}
          variant='outlined'
          label='Password'
          onChange={(e) => setPassword(e.target.value)}
          type={'password'}
        />
        <Box textAlign='right' sx={{ mb: theme.spacing(2) }}>
          <Typography variant='body2' color='textSecondary'>
            Lupa password? <Link href='/forgot-password'>Klik disini</Link>
          </Typography>
        </Box>
        <LoadingButton sx={{ height: theme.spacing(7) }} variant='contained' onClick={_handleLogin}>
          Login
        </LoadingButton>
      </Stack>
      <Grid container>
        <Grid item xs textAlign='center' sx={{ mt: theme.spacing(3) }}>
          <Typography variant='body2'> Propertek PMS - v3.0.0</Typography>
        </Grid>
      </Grid>
    </Grid>
    // </Container>
  );
};

export default Home;
