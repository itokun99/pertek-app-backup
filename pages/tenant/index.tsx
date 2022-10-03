import { Add, UploadFileOutlined, UploadOutlined } from '@mui/icons-material';
import { Box, Grid, Stack, Typography, useTheme } from '@mui/material';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import { ReactElement } from 'react';
import { AnimatedButton } from '../../src/components/AnimatedButtton';
import ProtectedPage from '../../src/template/ProtectedPage';

const TenantTable = dynamic(() => import('../../src/components/tables/TableTenant'), {
  ssr: false,
  suspense: true,
});

const TenantIndex = () => {
  const theme = useTheme();

  return (
    <Stack>
      <Box mb={5}>
        <Grid container>
          <Grid item flexGrow={1}>
            <Stack>
              <Typography variant='h6'>Tenant Management</Typography>
              <Typography variant='body2' color={theme.palette.text.secondary}>
                Kelola tenant properti
              </Typography>
            </Stack>
          </Grid>
          <Grid item>
            <Stack direction='row' gap={2}>
              <AnimatedButton startIcon={<Add />}>Tenant Baru</AnimatedButton>
              <AnimatedButton sx={{ backgroundColor: theme.palette.success.dark }} startIcon={<UploadOutlined />}>
                Upload CSV
              </AnimatedButton>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <Suspense>
        <TenantTable />
      </Suspense>
    </Stack>
  );
};

TenantIndex.getLayout = (page: ReactElement) => <ProtectedPage>{page}</ProtectedPage>;

export default TenantIndex;
