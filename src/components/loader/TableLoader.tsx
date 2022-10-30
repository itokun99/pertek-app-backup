import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export const TableLoader = () => (
  <Stack>
    <Skeleton sx={{ height: 75 }} />
    <Skeleton sx={{ height: 40 }} />
    <Skeleton sx={{ height: 40 }} />
    <Grid container justifyContent='flex-end' mt={2}>
      <Skeleton sx={{ height: 40, width: 300 }} />
    </Grid>
  </Stack>
);
