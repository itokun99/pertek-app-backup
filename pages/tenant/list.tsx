import { Add } from '@mui/icons-material';
import { Theme } from '@mui/material';
import { Avatar, Box, Card, Grid, Stack, Tab, Tabs, TextField, Typography, useTheme } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { PropsWithChildren, ReactElement } from 'react';
import useSWR from 'swr';
import { AnimatedButton } from '../../src/components/AnimatedButtton';
import Label from '../../src/components/Label';
import WithAppBar from '../../src/template/WithAppBar';

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

const TenantPage = () => {
  const theme = useTheme();

  const { data } = useSWR('/api/tenant');

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
          {/* <TabBar theme={theme} tabs={['All', 'Draft', 'Unpaid']} /> */}
          <Box
            sx={{
              paddingY: theme.spacing(2),
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

TenantPage.getLayout = (page: ReactElement) => <WithAppBar>{page}</WithAppBar>;

export default TenantPage;
