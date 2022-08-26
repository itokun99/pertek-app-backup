import { Typography } from '@mui/material';
import { ReactElement } from 'react';
import WithAppBar from '../../src/template/WithAppBar';

const PropertiIndex = () => {
  return <Typography>Properti Index</Typography>;
};

PropertiIndex.getLayout = (page: ReactElement) => <WithAppBar>{page}</WithAppBar>;

export default PropertiIndex;
