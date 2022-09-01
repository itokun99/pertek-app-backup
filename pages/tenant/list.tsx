import { Add } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  darken,
  Grid,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { motion } from 'framer-motion';

import { ReactElement } from 'react';
import useSWR from 'swr';
import { AnimatedButton } from '../../src/components/AnimatedButtton';
import Label from '../../src/components/Label';
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
    headerName: 'Periode Huni',
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
        <Label variant='ghost' color={params.value === 'Verified' ? 'success' : 'default'}>
          {params.value}
        </Label>
      );
    },
  },
];

const TenantPage = () => {
  const theme = useTheme();

  const { data } = useSWR('/api/tenant');

  return (
    <Stack>
      <Box>
        <Grid container>
          <Grid sx={{ flexGrow: 1, marginBottom: theme.spacing(4) }}>
            <Stack>
              <Typography variant='h6'>Tenant Management</Typography>
              <Typography variant='body2' color={theme.palette.text.secondary}>
                Kelola tenant properti
              </Typography>
            </Stack>
          </Grid>
          <Grid>
            <Box>
              <AnimatedButton startIcon={<Add />}>Tenant Baru</AnimatedButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Card>
          <Tabs
            sx={{
              paddingX: theme.spacing(2),
              backgroundColor: theme.palette.grey[200],
              display: 'flex',
            }}
            value={0}
          >
            <Tab disableRipple label='All' />
            <Tab disableRipple label='Verified' />
            <Tab disableRipple label='Draft' />
            <Tab disableRipple label='Banned' />
          </Tabs>
          <Box
            sx={{
              paddingY: theme.spacing(2),
              paddingLeft: theme.spacing(2),
            }}
          >
            <TextField label='Cari tenant' variant='outlined' />
          </Box>
          {data && (
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
              columns={columns}
              rows={data}
            />
          )}
        </Card>
      </Box>
    </Stack>
  );
};

TenantPage.getLayout = (page: ReactElement) => <WithAppBar>{page}</WithAppBar>;

export default TenantPage;
