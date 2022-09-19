import { Typography } from '@mui/material';
import { ReactElement } from 'react';
import ProtectedPage from '../../src/template/ProtectedPage';

const PengumumanBaru = () => {
  return <Typography>Tambah Pengumuman</Typography>;
};

PengumumanBaru.getLayout = (page: ReactElement) => <ProtectedPage>{page}</ProtectedPage>;

export default PengumumanBaru;
