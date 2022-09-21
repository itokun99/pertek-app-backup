import { Avatar, Box, Link, Typography, useTheme } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import useSWR from 'swr';
import { createTextAvatar } from '../../utils/createAvatar';
import { fDate } from '../../utils/formatTime';
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
            <Box sx={{ ml: 1 }}>
              <Typography variant='body1' color={theme.palette.primary.main}>
                <Link href='/profile'>{`${params.row.first_name} {params.row.last_name}`}</Link>
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
