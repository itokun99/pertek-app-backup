import Add from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import { ReactElement, Suspense } from 'react';
import AnimatedButton from '@components/buttons/AnimatedButton';
// import { AnnouncementTable } from '@components/tables/TableAnnouncement';
import ProtectedPage from '@template/ProtectedPage';

const AnnouncementTable = dynamic(() => import('@components/tables/TableAnnouncement'), {
  ssr: false,
  suspense: true,
});

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
      <Suspense>
        <AnnouncementTable />
      </Suspense>
    </Stack>
  );
};

PengumumanIndex.getLayout = (page: ReactElement) => <ProtectedPage>{page}</ProtectedPage>;

export default PengumumanIndex;
