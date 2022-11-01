import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

export interface CardLoaderProps {
  width?: number;
  height?: number;
}

export const CardLoader = ({ width = 150, height = 100 }: CardLoaderProps) => {
  return (
    <Grid item lg={4} width={width} height={height}>
      <Skeleton />
    </Grid>
  );
};
