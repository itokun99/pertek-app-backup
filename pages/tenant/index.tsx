import { Typography } from '@mui/material';
import { ReactElement } from 'react';
import WithAppBar from '../../src/template/WithAppBar';

const TenantIndex = () => <Typography>Tenant Index</Typography>;

TenantIndex.getLayout = (page: ReactElement) => <WithAppBar>{page}</WithAppBar>;

export default TenantIndex;
