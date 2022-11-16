import AnimatedButton from '@components/buttons/AnimatedButton';
import Add from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ProtectedPage from '@template/ProtectedPage';
import { ReactElement, Suspense } from 'react';

const PengumumanIndex = () => {
  const theme = useTheme();

  return (
    <Stack>
      <Box mb={5}>
        <Grid container>
          <Grid item flexGrow={1}>
            <Stack>
              <Typography variant='h6'>Pengumuman</Typography>
              <Typography variant='body2' color={theme.palette.text.secondary}>
                Kelola pengumuman kepada tenant Anda
              </Typography>
            </Stack>
          </Grid>
          <Grid item>
            <Box>
              <AnimatedButton startIcon={<Add />}>Pengumuman Baru</AnimatedButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Suspense></Suspense>
    </Stack>
  );
};

PengumumanIndex.getLayout = (page: ReactElement) => <ProtectedPage>{page}</ProtectedPage>;

export default PengumumanIndex;
