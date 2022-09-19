import { Typography } from '@mui/material';
import { ReactElement } from 'react';
import ProtectedPage from '../../src/template/ProtectedPage';

const TokenList = () => {
  return <Typography>Token List</Typography>;
};

TokenList.getLayout = (page: ReactElement) => <ProtectedPage>{page}</ProtectedPage>;

export default TokenList;
