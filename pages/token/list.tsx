import { Typography } from '@mui/material';
import { ReactElement } from 'react';
import WithAppBar from '../../src/template/WithAppBar';

const TokenList = () => {
  return <Typography>Token List</Typography>;
};

TokenList.getLayout = (page: ReactElement) => <WithAppBar>{page}</WithAppBar>;

export default TokenList;
