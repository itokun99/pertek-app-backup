import { Cached } from '@mui/icons-material';
import { Button, Container, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';

export const ErrorComponent = ({
  message,
  showReloadButton,
}: PropsWithChildren & { message?: string; showReloadButton?: boolean }) => (
  <Container sx={{ py: 2, lineHeight: 3, width: '100%', textAlign: 'center' }}>
    <Typography variant='body1'>{message ? message : 'Terjadi kesalahan.'}</Typography>
    {showReloadButton && (
      <Button variant='outlined' startIcon={<Cached />}>
        Muat Ulang
      </Button>
    )}
  </Container>
);
