import { Typography } from '@mui/material';
import { ReactElement } from 'react';
import WithAppBar from '../../src/template/WithAppBar';

const PengumumanIndex = () => {
  return <Typography>Pengumuman Index</Typography>;
};

PengumumanIndex.getLayout = (page: ReactElement) => <WithAppBar>{page}</WithAppBar>;

export default PengumumanIndex;
