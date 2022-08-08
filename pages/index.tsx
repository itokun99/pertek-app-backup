import { LoadingButton } from '@mui/lab';
import { Box, Container, Grid, Stack, TextField } from '@mui/material';
import styles from '../styles/Home.module.css';

import { useContext, useState } from 'react';
import { AuthContext } from '../src/context/AuthContext';
import { useLogin } from '../lib/login';
import { useRouter } from 'next/router';

const Home = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { changeState } = useContext(AuthContext);
  const router = useRouter();

  const _handleLogin = async (e: any) => {
    e.preventDefault();
    const ok = await useLogin(username, password);
    if (ok) {
      changeState(true);
      router.replace('/dashboard');
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Container maxWidth='lg'>
          <Grid container spacing={0} alignItems='center' alignContent='center' justifyContent='center'>
            <Grid item xs={12} sm={8} md={4}>
              <Stack rowGap={2}>
                <TextField variant='outlined' label='Username' onChange={(e) => setUsername(e.target.value)} />
                <TextField
                  variant='outlined'
                  label='Password'
                  onChange={(e) => setPassword(e.target.value)}
                  type={'password'}
                />
                <LoadingButton variant='contained' onClick={_handleLogin}>
                  Login
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </main>

      <footer className={styles.footer}>
        Copyright<span className={styles.logo}>Propertek @2022</span>
      </footer>
    </div>
  );
};

export default Home;
