import { Add, CloudDownload, CloudUpload, Search } from '@mui/icons-material';
import { Box, Card, Grid, InputAdornment, Stack, styled, TextField, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Suspense, SyntheticEvent, useContext, useEffect, useMemo, useState } from 'react';

import { ReactElement } from 'react';
import { AnimatedButton } from '../../src/components/AnimatedButtton';
import { ErrorComponent } from '../../src/components/error/ErrorComponent';
import { TableLoader } from '../../src/components/loader/TableLoader';
import { TabBar } from '../../src/components/TabBar';
import { UplaoderTable } from '../../src/components/tables/TableUploader';
import { doFetch } from '../../src/lib/dataFetcher';
import { AlertContext } from '../../src/provider/AlertProvider';
import { NetworkContext } from '../../src/provider/NetworkProvider';
import ProtectedPage from '../../src/template/ProtectedPage';

const GreenButton = styled(AnimatedButton)(({ theme }) => ({
  backgroundColor: theme.palette.success.main,
  '&:hover': {
    backgroundColor: theme.palette.success.dark,
  },
}));

const TenantTable = dynamic(() => import('../../src/components/tables/TableTenant'), {
  ssr: false,
  suspense: true,
});

const TenantIndex = () => {
  const theme = useTheme();
  const { query, push, isReady, asPath } = useRouter();
  const { isOnline, isOffline } = useContext(NetworkContext);
  const [isError, setIsError] = useState(false);
  const { setAlert } = useContext(AlertContext);

  const status = useMemo(() => ['Semua', 'Pending', 'Verified', 'Blocked'], []);

  const [tabIndex, setTabIndex] = useState<number>(0);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (isReady && query.tab) {
      setTabIndex(parseInt(query.tab as string));
    }
  }, [isReady, query.tab]);

  useEffect(() => {
    if (isReady && isOnline) {
      doFetch(asPath, setData, setAlert, setIsError);
    }
  }, [isReady, isOnline, asPath, setAlert]);

  const handleTabBarChange = (e: SyntheticEvent<Element, Event>, v: number) => {
    e.preventDefault();
    setTabIndex(v);

    if (v > 0) {
      return push('/tenant', {
        query: {
          status: status[v].toLowerCase(),
          tab: v,
        },
      });
    }
    return push('/tenant');
  };

  const handleReload = (e: any) => {
    e.preventDefault();
    doFetch(asPath, setData, setAlert, setIsError, true);
  };

  const handleTemplateDownload = async (e: any) => {
    e.preventDefault();

    const url = '/api/template?model=tenant';

    const res = await fetch(url);

    if (!res.ok) {
      const payload = await res.json();
      return setAlert({
        message: {
          severity: 'error',
          content: payload.message,
        },
      });
    }

    location.replace(url);
    setAlert({
      message: {
        severity: 'success',
        content: 'Download template berhasil!',
      },
    });
  };

  const handleCSVUpload = (e: any) => {
    e.prevenDefault();
  };

  return (
    <Stack mt={12}>
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
              <AnimatedButton color='info' startIcon={<Add />}>
                Tenant Baru
              </AnimatedButton>
              <AnimatedButton color='warning' onClick={handleTemplateDownload} startIcon={<CloudDownload />}>
                Template
              </AnimatedButton>
              <AnimatedButton color='success' component={motion.label} startIcon={<CloudUpload />}>
                Upload CSV
                <input type='file' hidden multiple accept='.csv' onChange={handleCSVUpload} />
              </AnimatedButton>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Card>
          <TabBar theme={theme} value={tabIndex} onChange={handleTabBarChange} tabs={status} />
          <Box mx={2}>
            {isOnline && data && !isError && (
              <Box
                width={400}
                sx={{
                  paddingY: theme.spacing(2),
                }}
              >
                <TextField
                  fullWidth
                  placeholder='Cari tenant'
                  variant='outlined'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            )}
            {(isOffline || (isOnline && isError)) && (
              <ErrorComponent onReload={handleReload} showReloadButton={isError} offline={isOffline} />
            )}
            {!data && isOnline && !isError && (
              <Box mb={2}>
                <TableLoader />
              </Box>
            )}
            {isOnline && data && !isError && (
              <Suspense>
                <TenantTable data={data.items} />
              </Suspense>
            )}
          </Box>
        </Card>
      </Box>
    </Stack>
  );
};

TenantIndex.getLayout = (page: ReactElement) => <ProtectedPage>{page}</ProtectedPage>;

export default TenantIndex;
