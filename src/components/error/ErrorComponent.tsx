import { Cached } from '@mui/icons-material';
import { Button, Container, Typography } from '@mui/material';
import { MouseEventHandler, PropsWithChildren } from 'react';

export type ErrorComponentProps = PropsWithChildren & {
  message?: string;
  showReloadButton?: boolean;
  offline?: boolean;
  onReload?: MouseEventHandler<HTMLButtonElement> | undefined;
};

export const ErrorComponent = ({ message, offline, showReloadButton, onReload }: ErrorComponentProps) => (
  <Container sx={{ py: 2, lineHeight: 3, width: '100%', textAlign: 'center' }}>
    {offline && <Typography variant='body1'>{'Tidak ada koneksi internet'}</Typography>}
    {!offline && <Typography variant='body1'>{message ? message : 'Terjadi kesalahan.'}</Typography>}
    {!offline && showReloadButton && (
      <Button variant='outlined' startIcon={<Cached />} onClick={onReload}>
        Muat Ulang
      </Button>
    )}
  </Container>
);
