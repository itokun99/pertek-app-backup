import { Add } from '@mui/icons-material';
import { Box, Grid, Stack, Typography, useTheme } from '@mui/material';
import { ReactElement, Suspense } from 'react';
import { AnimatedButton } from '../../src/components/AnimatedButtton';
import { PelaporanTable } from '../../src/components/tables/TablePelaporan';
import ProtectedPage from '../../src/template/ProtectedPage';

const PelaporanIndex = () => {
  const theme = useTheme();
  return (
    <Stack>
      <Box mb={5}>
        <Grid container>
          <Grid item flexGrow={1}>
            <Stack>
              <Typography variant='h6'>Pelaporan</Typography>
              <Typography variant='body2' color={theme.palette.text.secondary}>
                Kelola pelaporan atau komplain tenant Anda
              </Typography>
            </Stack>
          </Grid>
          <Grid item>
            <Box>
              <AnimatedButton startIcon={<Add />}>Laporan Baru</AnimatedButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Suspense>
        <PelaporanTable />
      </Suspense>
    </Stack>
  );
};

PelaporanIndex.getLayout = (page: ReactElement) => <ProtectedPage>{page}</ProtectedPage>;

export default PelaporanIndex;
