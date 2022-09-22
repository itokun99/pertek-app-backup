import { Typography } from '@mui/material';
import { ReactElement } from 'react';
import ProtectedPage from '../../src/template/ProtectedPage';

const PengumumanIndex = () => {
  return <Typography>Pengumuman Index</Typography>;
};

PengumumanIndex.getLayout = (page: ReactElement) => <ProtectedPage>{page}</ProtectedPage>;

export default PengumumanIndex;
