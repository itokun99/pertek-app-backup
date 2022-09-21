import { Add } from '@mui/icons-material';
import { Box, Card, Grid, Stack, Tab, Tabs, TextField, Theme, Typography, useTheme } from '@mui/material';
import dynamic from 'next/dynamic';
import { PropsWithChildren, Suspense } from 'react';

import { ReactElement } from 'react';
import { AnimatedButton } from '../../src/components/AnimatedButtton';
import ProtectedPage from '../../src/template/ProtectedPage';

const TenantTable = dynamic(() => import('../../src/components/tables/TenantTable'), {
  ssr: false,
  suspense: true,
});

const TenantIndex = () => {
  const theme = useTheme();
  return (
    <Stack>
      <Box mb={5}>
        <Grid container>
          <LeftSideHeader theme={theme} />
          <RightSideHeader />
        </Grid>
      </Box>
      <Box>
        <Card>
          <TabBar theme={theme} tabs={['All', 'Draft', 'Unpaid']} />
          <Box
            sx={{
              paddingY: theme.spacing(2),
            }}
          >
            <TextField label='Cari tenant' variant='outlined' />
          </Box>
          <Suspense fallback={`Loading...`}>
            <TenantTable />
          </Suspense>
        </Card>
      </Box>
    </Stack>
  );
};

const LeftSideHeader = ({ theme }: PropsWithChildren & { theme: Theme }) => (
  <Grid item flexGrow={1}>
    <Stack>
      <Typography variant='h6'>Tenant Management</Typography>
      <Typography variant='body2' color={theme.palette.text.secondary}>
        Kelola tenant properti
      </Typography>
    </Stack>
  </Grid>
);

const RightSideHeader = () => {
  return (
    <Grid item>
      <Box>
        <AnimatedButton startIcon={<Add />}>Tenant Baru</AnimatedButton>
      </Box>
    </Grid>
  );
};

type TabBarProps = PropsWithChildren & {
  theme: Theme;
  tabs: string[];
};

const TabBar = ({ theme, tabs }: TabBarProps) => {
  return (
    <Tabs
      sx={{
        paddingX: theme.spacing(2),
        backgroundColor: theme.palette.grey[200],
        display: 'flex',
      }}
      value={0}
    >
      {tabs.map((label, key) => (
        <Tab key={key} disableRipple label={label} />
      ))}
    </Tabs>
  );
};

TenantIndex.getLayout = (page: ReactElement) => <ProtectedPage>{page}</ProtectedPage>;

export default TenantIndex;
