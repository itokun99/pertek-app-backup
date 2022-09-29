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
import { AlertContext } from '../../provider/AlertProvider';
import { fDate } from '../../utils/formatTime';
import { ErrorComponent } from '../error/ErrorComponent';
import Label from '../Label';
import { TableLoader } from '../loader/TableLoader';

const PelaporanTable = () => {
  const theme = useTheme();
  const { query, push, isReady, asPath } = useRouter();

  const [filter, setFilter] = useState<number | null>(null);

  const [tabIndex, setTabIndex] = useState<number>(0);
  const [data, setData] = useState<any>(null);
  const { setAlert, alert } = useContext(AlertContext);

  useEffect(() => {
    if (isReady) {
      const fetcher = async () => {
        const res = await fetch('/api/complain_state?property_id');
      };

      fetcher();
    }
  }, [isReady]);

  useEffect(() => {
    if (isReady) {
      const fetcher = async () => {
        setData(null);
        const res = await fetch(`/api${asPath}`);
        const payload = await res.json();

        if (res.status !== 200) {
          setAlert({
            severity: 'error',
            message: payload.message || 'Terjadi kesalahan',
          });
        }

        setData(payload);
      };
      //   fetcher();
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
          <Stack direction='row' gap={2}>
            <Box width={200}>
              <FormControl fullWidth>
                <InputLabel>Filter</InputLabel>
                <Select label='Filter' value={filter} onChange={handleChange}>
                  <MenuItem>Testing</MenuItem>
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
          {alert && <ErrorComponent />}
          {!data && !alert && (
            <Box mb={2}>
              <TableLoader />
            </Box>
          )}
          <Box>
            {data && !alert && (
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
