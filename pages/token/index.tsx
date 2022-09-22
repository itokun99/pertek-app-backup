import { Typography } from '@mui/material';
import { ReactElement } from 'react';
import ProtectedPage from '../../src/template/ProtectedPage';

const TokenIndex = () => {
  return <Typography>Token Index</Typography>;
};

TokenIndex.getLayout = (page: ReactElement) => <ProtectedPage>{page}</ProtectedPage>;

export default TokenIndex;
