import { Typography } from '@mui/material';
import { ReactElement } from 'react';
import ProtectedPage from '../../src/template/ProtectedPage';

const PelaporanList = () => {
  return <Typography>Pelaporan List</Typography>;
};

PelaporanList.getLayout = (page: ReactElement) => <ProtectedPage>{page}</ProtectedPage>;

export default PelaporanList;
