import { Typography } from '@mui/material';
import { ReactElement } from 'react';
import WithAppBar from '../../src/template/WithAppBar';

const AddNewTenant = () => {
  return <Typography>Tambah tenant</Typography>;
};

AddNewTenant.getLayout = (page: ReactElement) => <WithAppBar>{page}</WithAppBar>;

export default AddNewTenant;
