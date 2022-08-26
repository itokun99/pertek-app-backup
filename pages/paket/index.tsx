import { Typography } from '@mui/material';
import { ReactElement } from 'react';
import WithAppBar from '../../src/template/WithAppBar';

const PaketIndex = () => {
  return <Typography>Paket Index</Typography>;
};

PaketIndex.getLayout = (page: ReactElement) => <WithAppBar>{page}</WithAppBar>;

export default PaketIndex;
