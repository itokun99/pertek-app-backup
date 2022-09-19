import { Typography } from '@mui/material';
import { ReactElement } from 'react';
import ProtectedPage from '../../src/template/ProtectedPage';

const PropertiIndex = () => {
  return <Typography>Properti Index</Typography>;
};

PropertiIndex.getLayout = (page: ReactElement) => <ProtectedPage>{page}</ProtectedPage>;

export default PropertiIndex;
