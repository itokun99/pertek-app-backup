import { Add } from '@mui/icons-material';
import { Box, Card, Grid, Stack, Tab, Tabs, TextField, Theme, Typography, useTheme } from '@mui/material';
import dynamic from 'next/dynamic';
import { PropsWithChildren, Suspense, useContext, useState } from 'react';

import { ReactElement } from 'react';
import { AnimatedButton } from '../../src/components/AnimatedButtton';
import { AlertContext } from '../../src/provider/AlertProvider';
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
            <Box>
              <AnimatedButton startIcon={<Add />}>Tenant Baru</AnimatedButton>
            </Box>
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
