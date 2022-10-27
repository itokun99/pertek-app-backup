import { Search } from '@mui/icons-material';
import { Avatar, Box, Card, InputAdornment, Link, TextField, Theme, Typography, useTheme } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import { PropsWithChildren, SyntheticEvent, useContext, useEffect, useMemo, useState } from 'react';
import { doFetch } from '../../lib/dataFetcher';
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
      renderCell: (params) => {
        return (
          <Typography variant='body2' color={theme.palette.text.secondary}>
            {params.row.phones.map((phone: any) => phone.number).join(', ')}
          </Typography>
        );
      },
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

const TenantTable = ({ data }: PropsWithChildren & { data: [] }) => {
  const theme = useTheme();
  return (
    <DataGrid
      headerHeight={40}
      density={'comfortable'}
      disableColumnSelector
      checkboxSelection
      hideFooterSelectedRowCount
      disableSelectionOnClick
      showCellRightBorder={false}
      autoHeight
      columns={generateTableColumns(theme)}
      rows={data}
    />
  );
};

export default TenantTable;
