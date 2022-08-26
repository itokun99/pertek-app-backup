import { Typography } from '@mui/material';
import { ReactElement } from 'react';
import WithAppBar from '../../src/template/WithAppBar';

const PelaporanList = () => {
  return <Typography>Pelaporan List</Typography>;
};

PelaporanList.getLayout = (page: ReactElement) => <WithAppBar>{page}</WithAppBar>;

export default PelaporanList;
