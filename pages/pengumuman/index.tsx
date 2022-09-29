import { Add } from '@mui/icons-material';
import { Box, Grid, Stack, Typography, useTheme } from '@mui/material';
import dynamic from 'next/dynamic';
import { ReactElement, Suspense } from 'react';
import { AnimatedButton } from '../../src/components/AnimatedButtton';
// import { AnnouncementTable } from '../../src/components/tables/TableAnnouncement';
import ProtectedPage from '../../src/template/ProtectedPage';

const AnnouncementTable = dynamic(() => import('../../src/components/tables/TableAnnouncement'), {
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
