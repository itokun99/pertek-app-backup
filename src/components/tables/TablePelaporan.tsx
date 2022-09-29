import { Search } from '@mui/icons-material';
import {
  Box,
  Card,
  FormControl,
  InputAdornment,
  InputLabel,
  Link,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import { ReactNode, SyntheticEvent, useContext, useEffect, useMemo, useState } from 'react';
import { fetchData } from '../../lib/dataFetcher';
import { AlertContext } from '../../provider/AlertProvider';
import { NetworkContext } from '../../provider/NetworkProvider';
import { fDate } from '../../utils/formatTime';
import { ErrorComponent } from '../error/ErrorComponent';
import Label from '../Label';
import { TableLoader } from '../loader/TableLoader';

const PelaporanTable = () => {
  const theme = useTheme();
  const { query, push, isReady, asPath } = useRouter();
  const { isOnline } = useContext(NetworkContext);

  const [filter, setFilter] = useState<number | null>(null);

  const [tabIndex, setTabIndex] = useState<number>(0);
  const [data, setData] = useState<any>(null);
  const { setAlert, alert } = useContext(AlertContext);

  useEffect(() => {
    if (isReady) {
      // get list of complain state
    }
  }, [isReady]);

  useEffect(() => {
    if (isReady) {
      (async () => {
        const { error, data } = await fetchData(`/api/${asPath}`);
        if (error) {
          setAlert({
            severity: 'error',
            message: error,
          });
          return;
        }
        setData(data);
      })();
    }
  }, [isReady, asPath, setAlert]);

  const handleChange = (e: SelectChangeEvent<number | null>, child: ReactNode) => {
    e.preventDefault();
    //
  };

  return (
    <Box>
      <Card>
        <Box m={2}>
          {data && isOnline && (
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
          {!isOnline && <ErrorComponent offline={!isOnline} />}
          {!data && isOnline && (
            <Box mb={2}>
              <TableLoader />
            </Box>
          )}
          {data && isOnline && (
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
