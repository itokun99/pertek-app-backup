import Typography from '@mui/material/Typography';
import { ReactElement } from 'react';
import ProtectedPage from '../../src/template/ProtectedPage';

const PaketIndex = () => {
  return <Typography>Paket Index</Typography>;
};

PaketIndex.getLayout = (page: ReactElement) => <ProtectedPage>{page}</ProtectedPage>;

export default PaketIndex;
