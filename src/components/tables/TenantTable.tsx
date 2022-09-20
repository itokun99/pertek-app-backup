import { Add } from '@mui/icons-material';
import { Avatar, Box, Card, Grid, Link, Stack, Tab, Tabs, TextField, Theme, Typography, useTheme } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { PropsWithChildren } from 'react';
import useSWR from 'swr';
import { APIListResponse } from '../../schema/apiListResponse';
import { createTextAvatar } from '../../utils/createAvatar';
import { fDate } from '../../utils/formatTime';
import { AnimatedButton } from '../AnimatedButtton';
import Label from '../Label';

const TenantTable = () => {
  const theme = useTheme();

  const { data, error } = useSWR('/api/tenant');
  if (!data) return <>Loading</>;
  if (error) return <>Error</>;

  const columns = [
    {
      headerName: 'Nama Tenant',
      field: 'first_name',
      flex: 1,
      renderCell(params) {
        const avatar = createTextAvatar(params.value);
        return (
          <>
            <Avatar sx={{ backgroundColor: avatar.color }}>{avatar.name}</Avatar>
            <Box
              sx={{
                ml: 1,
              }}
            >
              <Typography variant='body1' color={theme.palette.primary.main}>
                <Link href='/profile'>
                  <a className='textLink'>
                    {params.row.first_name} {params.row.last_name}
                  </a>
                </Link>
              </Typography>
              <Typography variant='caption' color={theme.palette.primary.main[300]}>
                <Link href={`/unit/${params.row.unit.id}`}>
                  <a className='textLink'>{params.row.unit.name}</a>
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
          <TabBar theme={theme} tabs={['All', 'Draft', 'Unpaid']} />
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
              rows={data.items}
            />
          )}
        </Card>
      </Box>
    </Stack>
  );
};

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

export default TenantTable;
