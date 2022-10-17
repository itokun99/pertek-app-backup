import { Cached } from '@mui/icons-material';
import { Button, Container, Typography } from '@mui/material';
import { MouseEventHandler, memo, ReactElement } from 'react';
import AnimatedButton from '../../buttons/AnimatedButton';

export interface ErrorStackProps {
  message?: string;
  type?: 'default' | 'offline' | string;
  reloadButton?: boolean;
  onReload?: MouseEventHandler<HTMLButtonElement> | undefined;
};

const ErrorStack = ({ message, type, reloadButton, onReload }: ErrorStackProps): ReactElement => {

  const getMessage = (): string => {
    switch (type) {
      case 'offline':
        return 'Tidak ada koneksi internet';
      default:
        return message || 'Terjadi kesalahan.';
    }
  }

  return (
    <Container sx={{ py: 2, lineHeight: 3, width: '100%', textAlign: 'center' }}>
      <Typography variant='body1'>{getMessage()}</Typography>
      {reloadButton && (
        <AnimatedButton variant='outlined' startIcon={<Cached />} onClick={onReload}>
          Muat Ulang
        </AnimatedButton>
      )}
    </Container>
  )
};

export default memo(ErrorStack);