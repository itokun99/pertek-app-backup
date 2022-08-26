import { Typography } from '@mui/material';
import { ReactElement } from 'react';
import WithAppBar from '../../src/template/WithAppBar';

const PengumumanList = () => {
  return <Typography>Pengumuman List</Typography>;
};

PengumumanList.getLayout = (page: ReactElement) => <WithAppBar>{page}</WithAppBar>;

export default PengumumanList;
