import { Cached } from '@mui/icons-material';
import { Avatar, Box, Button, IconButton, Link, Skeleton, Typography, useTheme } from '@mui/material';
import { Container } from '@mui/system';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { PropsWithChildren } from 'react';
import useSWR from 'swr';
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

const TenantTable = () => {
  const theme = useTheme();

  const { data, error } = useSWR('/api/tenant');
  if (!data)
    return (
      <>
        <Skeleton sx={{ mx: 1, lineHeight: 0.3, height: 100 }} />
        <Skeleton sx={{ mx: 1 }} />
      </>
    );
  if (error) return <ErrorComponent />;

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
            <Box sx={{ ml: 1 }}>
              <Typography variant='body1' color={theme.palette.primary.main}>
                <Link href='/profile'>{`${params.row.first_name} ${params.row.last_name}`}</Link>
              </Typography>
              <Typography variant='caption' color={theme.palette.primary.main[300]}>
                <Link href={`/unit/${params.row.unit.id}`}>{params.row.unit.name}</Link>
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
  );
};

export default TenantTable;
