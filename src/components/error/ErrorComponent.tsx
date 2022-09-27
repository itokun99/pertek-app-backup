import { Cached } from '@mui/icons-material';
import { Button, Container, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';

export const ErrorComponent = ({ message }: PropsWithChildren & { message?: string }) => (
  <Container sx={{ py: 2, lineHeight: 3, width: '100%', textAlign: 'center' }}>
    <Typography variant='body1'>{message ? message : 'Terjadi kesalahan.'}</Typography>
    <Button variant='outlined' startIcon={<Cached />}>
      Muat Ulang
    </Button>
  </Container>
);
