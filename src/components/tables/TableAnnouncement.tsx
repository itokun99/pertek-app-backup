import { Search } from '@mui/icons-material';
import { Box, Card, InputAdornment, Link, TextField, Typography, useTheme } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import { SyntheticEvent, useContext, useEffect, useMemo, useState } from 'react';
import { fetchData } from '../../lib/dataFetcher';
import { AlertContext } from '../../provider/AlertProvider';
import { fDateTime } from '../../utils/formatTime';
import { ErrorComponent } from '../error/ErrorComponent';
import Label from '../Label';
import { TableLoader } from '../loader/TableLoader';
import { TabBar } from '../TabBar';

const AnnouncementTable = () => {
  const { isReady, query, asPath } = useRouter();
  const [tabIndex, setTabIndex] = useState<number>(0);
  const status = useMemo(() => ['Semua', 'Draft', 'Published'], []);
  const [data, setData] = useState<any>(null);
  const { alert, setAlert } = useContext(AlertContext);
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    if (isReady && query.tab) {
      setTabIndex(parseInt(query.tab as string));
    }
  }, [isReady, query.tab]);

  useEffect(() => {
    if (isReady) {
      (async () => {
        setData(null);
        const { error, data } = await fetchData(`/api/${asPath}`);
        if (error) {
          setAlert({
            severity: 'error',
            message: error,
          });
          return;
        }
        setData(data);
      })();
    }
  }, [isReady, asPath, setAlert]);

  const handleChange = (e: SyntheticEvent<Element, Event>, tabIndex: number) => {
    e.preventDefault();
    setTabIndex(tabIndex);

    if (tabIndex > 0) {
      router.push('/pengumuman', {
        query: {
          tab: tabIndex,
          status: status[tabIndex].toLowerCase(),
        },
      });
      return;
    }
    router.push('/pengumuman');
  };

  return (
    <Box>
      <Card>
        <TabBar theme={theme} value={tabIndex} onChange={handleChange} tabs={status} />
        <Box mx={2}>
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
          {alert && <ErrorComponent />}
          {!data && !alert && (
            <Box mb={2}>
              <TableLoader />
            </Box>
          )}
          {data && (
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

export default AnnouncementTable;
