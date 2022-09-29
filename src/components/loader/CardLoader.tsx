import { Box, Grid, Skeleton } from '@mui/material';

export const CardLoader = () => {
  return (
    <Grid item lg={4}>
      <Skeleton />
    </Grid>
  );
};
