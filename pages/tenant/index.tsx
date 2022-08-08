import { Add } from '@mui/icons-material';
import { TabPanel } from '@mui/lab';
import {
  Box,
  Button,
  Card,
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
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { ReactElement } from 'react';
import { DataGridTable } from '../../src/components/DataGridTable';
import WithAppBar from '../../src/template/WithAppBar';
import { theColors } from '../../src/theme/base';

const TableWrapper = styled(Paper)(({ theme }: { theme?: Theme }) => ({
  borderRadius: '16px',
  boxShadow: theColors.shadows.paper,
}));

const columns: GridColDef[] = [
  {
    headerName: 'Nama',
    field: 'nama',
    width: 200,
  },
  {
    headerName: 'Mulai Huni',
    field: 'mulai_huni',
    width: 200,
  },
  {
    headerName: 'Akhir Huni',
    field: 'akhir_huni',
    width: 200,
  },
];

const rows: GridRowsProp = [
  {
    id: 1,
    nama: 'Nama 1',
    mulai_huni: 'Mulai Huni 1',
    akhir_huni: 'Akhir Huni 1',
  },
  {
    id: 2,
    nama: 'Nama 2',
    mulai_huni: 'Mulai Huni 2',
    akhir_huni: 'Akhir Huni 2',
  },
];

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
          <DataGridTable autoHeight columns={columns} rows={rows} />
        </TableWrapper>
      </Box>
    </Stack>
  );
};

TenantPage.getLayout = (page: ReactElement) => <WithAppBar>{page}</WithAppBar>;

export default TenantPage;
