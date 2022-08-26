import { Typography } from '@mui/material';
import { ReactElement } from 'react';
import WithAppBar from '../../src/template/WithAppBar';

const PelaporanIndex = () => {
  return <Typography>Pelaporan Index</Typography>;
};

PelaporanIndex.getLayout = (page: ReactElement) => <WithAppBar>{page}</WithAppBar>;

export default PelaporanIndex;
