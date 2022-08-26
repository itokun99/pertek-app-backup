import { Typography } from '@mui/material';
import { ReactElement } from 'react';
import WithAppBar from '../../src/template/WithAppBar';

const TokenIndex = () => {
  return <Typography>Token Index</Typography>;
};

TokenIndex.getLayout = (page: ReactElement) => <WithAppBar>{page}</WithAppBar>;

export default TokenIndex;
