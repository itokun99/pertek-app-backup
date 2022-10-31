import { Box, Button, Grid, Stack, Typography } from '@mui/material';

const NotFoundPage = () => {
  return (
    <Grid container direction='column' alignItems='center' justifyContent='center' style={{ minHeight: '100vh' }}>
      <Grid item xs={4}>
        <Stack spacing={1} alignItems='center'>
          <Typography variant='h5'>404 | Page Not Found</Typography>
          <Typography variant='subtitle2'>Halaman yang Anda tuju tidak ditemukan</Typography>
        </Stack>
      </Grid>
      <Grid item mt={5} xs={4} alignContent='center'>
        <Button variant='outlined' href='/dashboard'>
          Kembali
        </Button>
      </Grid>
    </Grid>
  );
};

export default NotFoundPage;
