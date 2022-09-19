import { Typography } from '@mui/material';
import { ReactElement } from 'react';
import ProtectedPage from '../../src/template/ProtectedPage';

const PelaporanIndex = () => {
  return <Typography>Pelaporan Index</Typography>;
};

PelaporanIndex.getLayout = (page: ReactElement) => <ProtectedPage>{page}</ProtectedPage>;

export default PelaporanIndex;
