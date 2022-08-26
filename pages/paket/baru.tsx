import { Typography } from '@mui/material';
import { ReactElement } from 'react';
import WithAppBar from '../../src/template/WithAppBar';

const PengumumanBaru = () => {
  return <Typography>Tambah Pengumuman</Typography>;
};

PengumumanBaru.getLayout = (page: ReactElement) => <WithAppBar>{page}</WithAppBar>;

export default PengumumanBaru;
