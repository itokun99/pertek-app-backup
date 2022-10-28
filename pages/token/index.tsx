import Typography from '@mui/material/Typography';
import { ReactElement } from 'react';
import ProtectedPage from '@template/ProtectedPage';

const TokenIndex = () => {
  return <Typography>Token Index</Typography>;
};

TokenIndex.getLayout = (page: ReactElement) => <ProtectedPage>{page}</ProtectedPage>;

export default TokenIndex;
