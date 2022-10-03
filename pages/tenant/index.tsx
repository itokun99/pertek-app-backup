import {
  Add,
  CloudUpload,
  Search,
  UploadFileOutlined,
  UploadFileRounded,
  UploadOutlined,
  UploadTwoTone,
} from '@mui/icons-material';
import { Box, Button, Card, Grid, InputAdornment, Stack, styled, TextField, Typography, useTheme } from '@mui/material';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { ChangeEventHandler, Suspense, SyntheticEvent, useContext, useEffect, useMemo, useState } from 'react';

import { ReactElement } from 'react';
import { AnimatedButton } from '../../src/components/AnimatedButtton';
import { ErrorComponent } from '../../src/components/error/ErrorComponent';
import { TableLoader } from '../../src/components/loader/TableLoader';
import { TabBar } from '../../src/components/TabBar';
import { doFetch } from '../../src/lib/dataFetcher';
import { AlertContext } from '../../src/provider/AlertProvider';
import { NetworkContext } from '../../src/provider/NetworkProvider';
import ProtectedPage from '../../src/template/ProtectedPage';

const TenantTable = dynamic(() => import('../../src/components/tables/TableTenant'), {
  ssr: false,
  suspense: true,
});

const GreenButton = styled(AnimatedButton)(({ theme }) => ({
  backgroundColor: theme.palette.success.main,
  '&:hover': {
    backgroundColor: theme.palette.success.dark,
  },
}));

const TenantIndex = () => {
  const theme = useTheme();
  const { query, push, isReady, asPath } = useRouter();
  const { isOnline, isOffline } = useContext(NetworkContext);
  const [isError, setIsError] = useState(false);
  const { setAlert } = useContext(AlertContext);

  const status = useMemo(() => ['Semua', 'Pending', 'Verified', 'Blocked'], []);

  const [csvFile, setCsvFile] = useState<File | null>();
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [data, setData] = useState<any>(null);

  const csvHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    const reader = new FileReader();

    reader.onload = (e) => {
      console.log(e.target?.result);
    };

    reader.readAsText(e.target.files![0]);
  };
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

  const handleChange = (e: SyntheticEvent<Element, Event>, v: number) => {
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
              <AnimatedButton startIcon={<Add />}>Tenant Baru</AnimatedButton>
              <GreenButton
                component='label'
                sx={{ backgroundColor: theme.palette.success.dark }}
                startIcon={<CloudUpload />}
              >
                Upload CSV
                <input type='file' hidden multiple accept='.csv' onChange={csvHandler} />
              </GreenButton>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Card>
          <TabBar theme={theme} value={tabIndex} onChange={handleChange} tabs={status} />
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
