import { Add } from '@mui/icons-material';
import { TabPanel } from '@mui/lab';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Chip,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  styled,
  Tab,
  Tabs,
  Theme,
  Typography,
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp } from '@mui/x-data-grid';
import { ReactElement } from 'react';
import { DataGridTable } from '../../src/components/DataGridTable';
import WithAppBar from '../../src/template/WithAppBar';
import { avatarBgColors, theColors } from '../../src/theme/base';

const TableWrapper = styled(Paper)(({ theme }: { theme?: Theme }) => ({
  borderRadius: theme?.spacing(2),
  boxShadow: theColors.shadows.paper,
}));

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
    renderCell(params) {
      console.log(params);
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
      return (
        <Chip
          color={params.value === 'Verified' ? 'success' : 'default'}
          size='small'
          variant='filled'
          label={params.value}
        />
      );
    },
  },
];

const userData: TenantDataModel[] = [
  {
    id: 1,
    name: 'John Doe',
    color: '#ff0000',
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
    color: '#ff0',
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
  return (
    <Stack>
      <Box>
        <Grid container>
          <Grid sx={{ flexGrow: 1 }}>
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
        <TableWrapper>
          <Tabs
            sx={{
              paddingLeft: '16px',
              paddingRight: '16px',
              display: 'flex',
            }}
            value={0}
            indicatorColor='primary'
            textColor='primary'
          >
            <Tab label='All' />
            <Tab label='Active' />
            <Tab label='Inactive' />
          </Tabs>
          <DataGridTable
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
        </TableWrapper>
      </Box>
    </Stack>
  );
};

TenantPage.getLayout = (page: ReactElement) => <WithAppBar>{page}</WithAppBar>;

export default TenantPage;
