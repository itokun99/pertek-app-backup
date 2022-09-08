import { LoadingButton } from '@mui/lab';
import { alpha, Box, Grid, IconButton, InputAdornment, Stack, TextField, Typography, useTheme } from '@mui/material';

import { useSession, signIn, getSession } from 'next-auth/react';

import { useContext, useState } from 'react';
import { AuthContext } from '../src/provider/AuthProvider';
import { useLogin } from '../lib/login';
import { useRouter } from 'next/router';
import { AccountCircle, Key, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import Link from 'next/link';

const Home = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setVisibility] = useState(false);

  const router = useRouter();

  const theme = useTheme();

  return (
    <Grid
      container
      sx={{
        minHeight: '100vh',
        alignContent: 'center',
        justifyContent: 'center',
        justifyItems: 'center',
      }}
    >
      <Grid item width={350}>
        <Stack rowGap={3}>
          <Box sx={{ mb: theme.spacing(2) }}>
            <Typography variant='h5'>PROPERTEK</Typography>
            <Typography variant='body2' color={theme.palette.text.secondary}>
              Best Indonesia Property Management System
            </Typography>
          </Box>
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
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton aria-label='show password' onClick={() => setVisibility(!isVisible)}>
                    {isVisible ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant='outlined'
            label='Password'
            onChange={(e) => setPassword(e.target.value)}
            type={isVisible ? 'text' : 'password'}
          />
          <Box textAlign='right' sx={{ mb: theme.spacing(2) }}>
            <Typography color={theme.palette.primary.main} fontWeight={600}>
              <Link href='/forgot-password'>Lupa password?</Link>
            </Typography>
          </Box>
          <LoadingButton sx={{ height: theme.spacing(6) }} variant='contained'>
            Login
          </LoadingButton>
        </Stack>
        <Grid container>
          <Grid item xs textAlign='center' sx={{ mt: theme.spacing(5) }}>
            <Typography variant='body2' color={alpha(theme.palette.grey[500], 0.8)}>
              {' '}
              Propertek PMS - v3.0.0
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
