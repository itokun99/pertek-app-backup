import { Search } from '@mui/icons-material';
import {
  Box,
  Card,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import { ReactNode, useContext, useEffect, useState } from 'react';
import { doFetch } from '../../lib/dataFetcher';
import { AlertContext } from '../../provider/AlertProvider';
import { NetworkContext } from '../../provider/NetworkProvider';
import { fDate } from '../../utils/formatTime';
import { ErrorComponent } from '../error/ErrorComponent';
import Label from '../Label';
import { TableLoader } from '../loader/TableLoader';

const PelaporanTable = () => {
  const { query, push, isReady, asPath } = useRouter();

  const { isOnline } = useContext(NetworkContext);
  const { setAlert } = useContext(AlertContext);

  const [filter, setFilter] = useState<number | null>(null);
  const [data, setData] = useState<any>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (isReady) {
      // get list of complain state
    }
  }, [isReady]);

  useEffect(() => {
    if (isReady) {
      doFetch(asPath, isOnline, setData, setAlert, setIsError);
    }
  }, [isReady, asPath, setIsError, isOnline, setAlert]);

  const handleChange = (e: SelectChangeEvent<number | null>, child: ReactNode) => {
    e.preventDefault();
    //
  };

  const handleReload = (e: any) => {
    e.preventDefault();
    doFetch(asPath, isOnline, setData, setAlert, setIsError, true);
  };

  return (
    <Box>
      <Card>
        <Box m={2}>
          {data && isOnline && !isError && (
            <Stack direction='row' gap={2} mb={2}>
              <Box width={200}>
                <FormControl fullWidth>
                  <InputLabel>Filter</InputLabel>
                  <Select label='Filter' value={filter} onChange={handleChange}>
                    {<MenuItem value={0}>Testing</MenuItem>}
                  </Select>
                </FormControl>
              </Box>
              <Box width={400}>
                <TextField
                  fullWidth
                  placeholder='Cari laporan'
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
            </Stack>
          )}
          {(!isOnline || (isOnline && isError)) && (
            <ErrorComponent onReload={handleReload} showReloadButton={isError} offline={!isOnline} />
          )}
          {!data && isOnline && !isError && (
            <Box mb={2}>
              <TableLoader />
            </Box>
          )}
          {data && isOnline && !isError && (
            <DataGrid
              headerHeight={40}
              density={'comfortable'}
              disableColumnSelector
              checkboxSelection
              hideFooterSelectedRowCount
              disableSelectionOnClick
              showCellRightBorder={false}
              autoHeight
              columns={Columns}
              rows={(data && data.items) || []}
            />
          )}
        </Box>
      </Card>
    </Box>
  );
};

const Columns = [
  {
    headerName: 'Judul Laporan',
    field: 'subject',
    flex: 1,
  },
  {
    headerName: 'Isi Laporan',
    field: 'description',
    flex: 1,
  },
  {
    headerName: 'Pelapor',
    field: 'person',
    flex: 1,
    valueGetter: (params) => params.value.username,
  },
  {
    headerName: 'Status',
    field: 'state',
    flex: 1,
    renderCell(params) {
      return (
        <Label variant='ghost' color='default'>
          {params.value.name}
        </Label>
      );
    },
  },
  {
    headerName: 'Tgl. Laporan',
    field: 'created_at',
    flex: 1,
    renderCell: (params) => fDate(params.value),
  },
] as GridColDef[];

export default PelaporanTable;
