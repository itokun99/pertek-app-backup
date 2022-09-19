import { Typography } from '@mui/material';
import { ReactElement } from 'react';
import ProtectedPage from '../../src/template/ProtectedPage';

const AddNewTenant = () => {
  return <Typography>Tambah tenant</Typography>;
};

AddNewTenant.getLayout = (page: ReactElement) => <ProtectedPage>{page}</ProtectedPage>;

export default AddNewTenant;
