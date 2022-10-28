import Add from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import { ReactElement, Suspense } from 'react';
import AnimatedButton from '@components/buttons/AnimatedButton';
import ProtectedPage from '@template/ProtectedPage';

const PelaporanTable = dynamic(() => import('@components/tables/TablePelaporan'), {
  ssr: false,
  suspense: true,
});

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
