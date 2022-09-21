import { LoadingButton } from '@mui/lab';
import {
  Alert as MuiAlert,
  AlertProps,
  alpha,
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';

import { FormEvent, forwardRef, useState } from 'react';
import { AccountCircle, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/router';

type MessageType = {
  type: 'error' | 'success' | 'warning' | 'info';
  message: string;
};

const LoginPage = () => {
  const theme = useTheme();
  const router = useRouter();

  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState<MessageType | null>(null);
  const [isVisible, setVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (identity === '' && password === '') {
      setAlert({
        type: 'warning',
        message: 'Identitas dan atau passwork tidak boleh kosong!',
      });
      setIsLoading(false);
      return;
    }

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identity,
        password,
      }),
    });

    const payload = await response.json();

    if (!response.ok) {
      setAlert({ type: 'error', message: payload.message || 'Unknown error occurs' });
      setIsLoading(false);
      return;
    }

    setIsLoading(false);

    router.replace('/dashboard');
  };

  const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
  });

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
            {alert !== null && (
              <Snackbar
                onClose={() => setAlert(null)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={alert !== null}
              >
                <Alert severity={alert.type}>{alert.message}</Alert>
              </Snackbar>
            )}
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
            <LoadingButton loading={isLoading} type='submit' sx={{ height: theme.spacing(6) }} variant='contained'>
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
