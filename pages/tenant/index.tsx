import { Add, Label } from '@mui/icons-material';
import { TabPanel } from '@mui/lab';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Chip,
  Container,
  darken,
  Grid,
  IconButton,
  Input,
  Paper,
  Stack,
  styled,
  Tab,
  Tabs,
  TextField,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ReactElement } from 'react';
import WithAppBar from '../../src/template/WithAppBar';

import { PRIMARY, SECONDARY } from '../../src/theme/palette';

interface TenantDataModel {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  tenantStatus: string;
  unit: string;
  checkInDate: string;
  checkOutDate: string;
  color: string;
}

const columns: GridColDef[] = [
  {
    headerName: 'Nama Tenant',
    field: 'name',
    flex: 1,
    minWidth: 200,
    headerClassName: 'testing',
    renderCell(params) {
      return (
        <>
          <Avatar
            sx={{
              backgroundColor: params.row.color,
            }}
          >
            {params.value.charAt(0)}
          </Avatar>
          <Box
            sx={{
              ml: 1,
            }}
          >
            <Typography variant='body2'>{params.value}</Typography>
            <Typography variant='caption'>{params.row.unit}</Typography>
          </Box>
        </>
      );
    },
  },
  {
    headerName: 'Color',
    field: 'color',
  },
  {
    headerName: 'Kontak',
    field: 'contact',
    flex: 1,
    minWidth: 200,
    renderCell(params) {
      return (
        <Box>
          <Typography variant='body2'>{params.row.email}</Typography>
          <Typography variant='caption'>{params.row.phone}</Typography>
        </Box>
      );
    },
  },
  {
    headerName: 'Email',
    field: 'email',
  },
  {
    headerName: 'Phone',
    field: 'phone',
  },
  {
    headerName: 'Status Kepemilikan',
    field: 'status',
    flex: 1,
  },
  {
    headerName: 'Unit',
    field: 'unit',
    flex: 1,
  },
  {
    headerName: 'Masa Huni',
    field: 'occupyPeriod',
    flex: 1,
    renderCell(params) {
      return (
        <Box>
          <Typography variant='body2'>{params.row.checkInDate}</Typography>
          <Typography variant='body2'>{params.row.checkOutDate}</Typography>
        </Box>
      );
    },
  },
  {
    headerName: 'Awal Huni',
    field: 'checkInDate',
    flex: 1,
  },
  {
    headerName: 'Akhir Huni',
    field: 'checkOutDate',
    flex: 1,
  },
  {
    headerName: 'Status Warga',
    field: 'tenantStatus',
    flex: 1,
    renderCell(params) {
      return <Label></Label>;
    },
  },
];

const userData: TenantDataModel[] = [
  {
    id: 1,
    name: 'John Doe',
    color: darken(PRIMARY.main, 0.05),
    unit: '2A-01-01',
    status: 'Pemilik',
    email: 'lombok.oc@gmail.com',
    tenantStatus: 'Draft',
    phone: '081234567890',
    checkInDate: '01/01/2020',
    checkOutDate: '-',
  },
  {
    id: 2,
    name: 'John Doe',
    color: darken(SECONDARY.main, 0.05),
    unit: '2A-01-01',
    status: 'Pemilik',
    tenantStatus: 'Verified',
    email: 'jane@mail.com',
    phone: '081234567890',
    checkInDate: '01/01/2020',
    checkOutDate: '-',
  },
];

const rows = userData.map((user: TenantDataModel) => ({
  ...user,
}));

const TenantPage = () => {
  const theme = useTheme();
  return (
    <Stack>
      <Box>
        <Grid container>
          <Grid sx={{ flexGrow: 1, marginBottom: theme.spacing(4) }}>
            <Stack>
              <Typography variant='h6'>Tenant Management</Typography>
              <Typography variant='body2'>Kelola tenant properti</Typography>
            </Stack>
          </Grid>
          <Grid>
            <Button startIcon={<Add />} variant='contained'>
              Tenant Baru
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Card>
          <Tabs
            sx={{
              paddingLeft: theme.spacing(2),
              paddingRight: theme.spacing(2),
              backgroundColor: theme.palette.grey[200],
              display: 'flex',
            }}
            value={0}
          >
            <Tab disableRipple label='All' />
            <Tab disableRipple label='Active' />
            <Tab label='Inactive' />
          </Tabs>
          <Box
            sx={{
              paddingTop: theme.spacing(2),
              paddingBottom: theme.spacing(2),
              paddingLeft: theme.spacing(2),
            }}
          >
            <TextField label='Cari tenant' variant='outlined' />
          </Box>
          <DataGrid
            columnVisibilityModel={{
              color: false,
              email: false,
              phone: false,
              checkInDate: false,
              checkOutDate: false,
            }}
            disableColumnSelector
            checkboxSelection
            hideFooterSelectedRowCount
            disableSelectionOnClick
            showCellRightBorder={false}
            autoHeight
            columns={columns}
            rows={rows}
          />
        </Card>
      </Box>
    </Stack>
  );
};

TenantPage.getLayout = (page: ReactElement) => <WithAppBar>{page}</WithAppBar>;

export default TenantPage;
