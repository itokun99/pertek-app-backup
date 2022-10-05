import { LoadingButton } from '@mui/lab';
import { alpha, Box, Grid, IconButton, InputAdornment, Stack, TextField, Typography, useTheme } from '@mui/material';

import { FormEvent, useContext, useState } from 'react';
import { AccountCircle, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { fetchData } from '../../src/lib/dataFetcher';
import { AlertContext } from '../../src/provider/AlertProvider';
import { NetworkContext } from '../../src/provider/NetworkProvider';

const LoginPage = () => {
  const theme = useTheme();
  const router = useRouter();

  const { setAlert } = useContext(AlertContext);
  const { isOffline } = useContext(NetworkContext);

  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (identity === '' || password === '') {
      setAlert({
        message: {
          severity: 'warning',
          content: 'Identitas dan atau password tidak boleh kosong!',
        },
      });
      setIsLoading(false);
      return;
    }

    const { error } = await fetchData('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        identity,
        password,
      }),
    });

    if (error) {
      setAlert({
        message: {
          severity: 'error',
          content: error.message,
        },
      });
      setIsLoading(false);
      return;
    }

    setIsLoading(false);

    router.replace('/properti');
  };

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
        <form onSubmit={handleSubmit}>
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
              label='Identitas'
              onChange={(e) => setIdentity(e.target.value)}
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
            <LoadingButton
              disabled={isOffline}
              loading={isLoading}
              type='submit'
              sx={{ height: theme.spacing(6) }}
              variant='contained'
            >
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
        </form>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
