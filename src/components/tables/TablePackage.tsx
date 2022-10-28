import Search from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import { SyntheticEvent, useContext, useEffect, useMemo, useState } from 'react';
import { doFetch } from '@lib/dataFetcher';
import { AlertContext } from '@provider/AlertProvider';
import { NetworkContext } from '@provider/NetworkProvider';
import { fDateTime } from '@utils/formatTime';
import { ErrorComponent } from '../error/ErrorComponent';
import Label from '../Label';
import { TableLoader } from '../loader/TableLoader';
import { TabBar, TabItem } from '../TabBar';

const PackageTable = () => {
  const theme = useTheme();
  const status = useMemo(
    () =>
      [
        { text: 'All', color: 'default' },
        { text: 'Draft', color: 'warning' },
        { text: 'Published', color: 'success' },
      ] as TabItem[],
    []
  );
  const { isReady, query, asPath, push } = useRouter();

  const { setAlert } = useContext(AlertContext);
  const { isOnline, isOffline } = useContext(NetworkContext);

  const [tabIndex, setTabIndex] = useState<number>(0);
  const [data, setData] = useState<any>(null);
  const [isError, setIsError] = useState(false);

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

  const handleChange = (e: SyntheticEvent<Element, Event>, tabIndex: number | string) => {
    e.preventDefault();
    const index = parseInt(tabIndex as string);
    setTabIndex(index);

    if (tabIndex > 0) {
      push('/paket', {
        query: {
          tab: tabIndex,
          status: status[index].text.toLowerCase(),
        },
      });
      return;
    }
    push('/paket');
  };

  const handleReload = (e: any) => {
    e.preventDefault();
    doFetch(asPath, setData, setAlert, setIsError, true);
  };

  return (
    <Box>
      <Card>
        <TabBar theme={theme} value={tabIndex} onChange={handleChange} tabs={status} />
        <Box mx={2}>
          {data && isOnline && !isError && (
            <Box
              width={400}
              sx={{
                paddingY: theme.spacing(2),
              }}
            >
              <TextField
                fullWidth
                placeholder='Cari pengumuman'
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
          {data && isOnline && !isError && (
            <DataGrid
              columns={Columns}
              rows={(data && data.items) || []}
              headerHeight={40}
              density='standard'
              disableColumnSelector
              checkboxSelection
              hideFooterSelectedRowCount
              disableSelectionOnClick
              showCellRightBorder={false}
              autoHeight
            />
          )}
        </Box>
      </Card>
    </Box>
  );
};

const Columns = [
  {
    headerName: 'Topik',
    flex: 1,
    field: 'subject',
    renderCell: (params) => {
      return (
        <Typography variant='subtitle1' color='black'>
          <Link href={`/pengumuman/${params.row.id}`}>{params.value}</Link>
        </Typography>
      );
    },
  },
  {
    headerName: 'Pengumuman',
    flex: 1,
    field: 'content',
    valueFormatter: (params) => {
      const length = (params.value as string).length > 30 ? 30 : params.value.length;
      `${(params.value as string).slice(0, length)}...`;
    },
  },
  {
    headerName: 'Status',
    flex: 1,
    field: 'status',
    renderCell: (params) => {
      return (
        <Label variant='ghost' color={params.value === 'published' ? 'success' : 'default'}>
          {params.value === 'published' ? 'Diterbitkan' : 'Draft'}
        </Label>
      );
    },
  },
  {
    headerName: 'Tujuan',
    flex: 1,
    field: 'target_segment',
  },
  {
    headerName: 'Tanggal Dibuat',
    flex: 1,
    field: 'created_at',
    valueFormatter: (params) => (params.value === null ? '-' : fDateTime(params.value)),
  },
  {
    headerName: 'Tanggal Terbit',
    flex: 1,
    field: 'published_at',
    valueFormatter: (params) => (params.value === null ? '-' : fDateTime(params.value)),
  },
] as GridColDef[];

export default PackageTable;
