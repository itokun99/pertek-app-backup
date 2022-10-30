import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

export const CardLoader = () => {
  return (
    <Grid item lg={4}>
      <Skeleton />
    </Grid>
  );
};
