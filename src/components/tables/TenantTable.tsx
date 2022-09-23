import { Cached } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  Link,
  Skeleton,
  Tab,
  Tabs,
  TextField,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import { Container } from '@mui/system';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import { PropsWithChildren, SyntheticEvent, useContext, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import { AlertContext } from '../../provider/AlertProvider';
import { createTextAvatar } from '../../utils/createAvatar';
import { fDate } from '../../utils/formatTime';
import Label from '../Label';

const ErrorComponent = ({ message }: PropsWithChildren & { message?: string }) => (
  <Container sx={{ py: 2, lineHeight: 3, width: '100%', textAlign: 'center' }}>
    <Typography variant='body1'>{message ? message : 'Terjadi kesalahan.'}</Typography>
    <Button variant='outlined' startIcon={<Cached />}>
      Muat Ulang
    </Button>
  </Container>
);

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
  const [error, setError] = useState(false);
  const { setAlert } = useContext(AlertContext);

  const status = useMemo(() => ['Semua', 'Pending', 'Verified', 'Blocked'], []);

  useEffect(() => {
    if (isReady && query.tab) {
      setTabIndex(parseInt(query.tab as string));
    }
  }, [isReady, query.tab]);

  useEffect(() => {
    if (isReady) {
      const fetcher = async () => {
        setData(null);
        const res = await fetch(`/api${asPath}`);
        const payload = await res.json();
        setData(payload);
      };
      fetcher();
    }
  }, [isReady, asPath]);

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
          <Box
            sx={{
              paddingY: theme.spacing(2),
            }}
          >
            <TextField label='Cari tenant' variant='outlined' />
          </Box>
          {error && <ErrorComponent />}
          {!data && !error && (
            <>
              <Skeleton sx={{ lineHeight: 0.3, height: 80 }} />
              <Skeleton />
            </>
          )}
          {data && !error && (
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
              rows={data.items || []}
            />
          )}
        </Box>
      </Card>
    </Box>
  );
};

type TabType = {
  color: 'warning' | 'success' | 'info' | 'error' | 'default';
  label: string;
};
type TabBarProps = PropsWithChildren & {
  theme: Theme;
  value: number;
  tabs: string[];
  onChange?: (e: SyntheticEvent<Element, Event>, value: number) => void;
};

const TabBar = ({ theme, tabs, value, onChange }: TabBarProps) => {
  return (
    <Tabs
      sx={{
        paddingX: theme.spacing(2),
        backgroundColor: theme.palette.grey[200],
        display: 'flex',
      }}
      value={value}
      onChange={onChange}
    >
      {tabs.map((tab, key) => (
        <Tab
          key={key}
          id={`tenant-table-tab-${value}`}
          disableRipple
          label={<Typography variant='subtitle2'>{tab}</Typography>}
        />
      ))}
    </Tabs>
  );
};

export default TenantTable;
