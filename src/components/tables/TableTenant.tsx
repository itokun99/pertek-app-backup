import { Search } from '@mui/icons-material';
import { Avatar, Box, Card, InputAdornment, Link, TextField, Theme, Typography, useTheme } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import { SyntheticEvent, useContext, useEffect, useMemo, useState } from 'react';
import { fetchData } from '../../lib/dataFetcher';
import { AlertContext } from '../../provider/AlertProvider';
import { NetworkContext } from '../../provider/NetworkProvider';
import { createTextAvatar } from '../../utils/createAvatar';
import { fDate } from '../../utils/formatTime';
import { ErrorComponent } from '../error/ErrorComponent';
import Label from '../Label';
import { TableLoader } from '../loader/TableLoader';
import { TabBar } from '../TabBar';

const generateTableColumns = (theme: Theme) =>
  [
    {
      headerName: 'Nama Tenant',
      field: 'first_name',
      flex: 1,
      renderCell(params) {
        const avatar = createTextAvatar(params.value);
        return (
          <>
            <Avatar sx={{ backgroundColor: avatar.color }}>{avatar.name}</Avatar>
            <Box sx={{ ml: 1 }}>
              <Typography variant='subtitle1'>
                <Link
                  sx={{ color: theme.palette.text.primary }}
                  href='/profile'
                >{`${params.row.first_name} ${params.row.last_name}`}</Link>
              </Typography>
              <Typography variant='subtitle2'>
                <Link href={`/unit/${params.row.unit.id}`} color={theme.palette.text.secondary}>
                  {params.row.unit.name}
                </Link>
              </Typography>
            </Box>
          </>
        );
      },
    },
    {
      headerName: 'No. Telp',
      field: 'phone_number',
      flex: 1,
    },
    {
      headerName: 'Mulai Huni',
      field: 'check_in',
      flex: 1,
      renderCell: (params) => fDate(params.value),
    },
    {
      headerName: 'Status Tenant',
      field: 'resident_status',
      flex: 1,
      renderCell(params) {
        return (
          <Label variant='ghost' color={params.value === 'verified' ? 'success' : 'default'}>
            {params.value}
          </Label>
        );
      },
    },
  ] as GridColDef[];

const TenantTable = () => {
  const theme = useTheme();
  const { query, push, isReady, asPath } = useRouter();

  const [tabIndex, setTabIndex] = useState<number>(0);
  const [data, setData] = useState<any>(null);
  const { setAlert, alert } = useContext(AlertContext);
  const { isOnline } = useContext(NetworkContext);

  const status = useMemo(() => ['Semua', 'Pending', 'Verified', 'Blocked'], []);

  useEffect(() => {
    if (isReady && query.tab) {
      setTabIndex(parseInt(query.tab as string));
    }
  }, [isReady, query.tab]);

  useEffect(() => {
    if (isReady && isOnline) {
      (async () => {
        setData(null);
        const { error, data } = await fetchData(`/api/${asPath}`);
        if (error) {
          if (isOnline) {
            setAlert({
              severity: 'error',
              message: error,
            });
          }
          return;
        }

        setData(data);
      })();
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

  return (
    <Box>
      <Card>
        <TabBar theme={theme} value={tabIndex} onChange={handleChange} tabs={status} />
        <Box mx={2}>
          {isOnline && data && (
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
          {!isOnline && <ErrorComponent offline={!isOnline} />}
          {!data && isOnline && (
            <Box mb={2}>
              <TableLoader />
            </Box>
          )}
          {isOnline && data && (
            <DataGrid
              columnVisibilityModel={{
                color: false,
                email: false,
                phone: false,
                checkInDate: false,
                checkOutDate: false,
              }}
              headerHeight={40}
              density={'comfortable'}
              disableColumnSelector
              checkboxSelection
              hideFooterSelectedRowCount
              disableSelectionOnClick
              showCellRightBorder={false}
              autoHeight
              columns={generateTableColumns(theme)}
              rows={(data && data.items) || []}
            />
          )}
        </Box>
      </Card>
    </Box>
  );
};

export default TenantTable;
