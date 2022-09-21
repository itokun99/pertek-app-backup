import { Box, Skeleton, Stack } from '@mui/material';
import { PropsWithChildren } from 'react';

export type ListLoaderProps = PropsWithChildren & {
  group?: number;
  list?: number;
};

export const ListLoader = ({ group, list }: ListLoaderProps) => {
  return (
    <Stack direction='column'>
      <Skeleton sx={{ width: 200, mb: 2 }} />
      <Stack direction='column'>}
        <Box display='flex' width='100%' height={30} justifyContent='center' alignItems='center'>
          <Skeleton width={15} height={25} sx={{ borderRadius: 1, ml: 1, mr: 2.6 }} />
          <Skeleton width='100%' height={25} sx={{ borderRadius: 1 }} />
        </Box>
        <Box display='flex' width='100%' height={30} justifyContent='center' alignItems='center'>
          <Skeleton width={15} height={25} sx={{ borderRadius: 1, ml: 1, mr: 2.6 }} />
          <Skeleton width='100%' height={25} sx={{ borderRadius: 1 }} />
        </Box>
        <Box display='flex' width='100%' height={30} justifyContent='center' alignItems='center'>
          <Skeleton width={15} height={25} sx={{ borderRadius: 1, ml: 1, mr: 2.6 }} />
          <Skeleton width='100%' height={25} sx={{ borderRadius: 1 }} />
        </Box>
      </Stack>
      <Skeleton sx={{ width: 200, mb: 2, mt: 2 }} />
      <Stack direction='column'>
        <Box display='flex' width='100%' height={30} justifyContent='center' alignItems='center'>
          <Skeleton width={15} height={25} sx={{ borderRadius: 1, ml: 1, mr: 2.6 }} />
          <Skeleton width='100%' height={25} sx={{ borderRadius: 1 }} />
        </Box>
        <Box display='flex' width='100%' height={30} justifyContent='center' alignItems='center'>
          <Skeleton width={15} height={25} sx={{ borderRadius: 1, ml: 1, mr: 2.6 }} />
          <Skeleton width='100%' height={25} sx={{ borderRadius: 1 }} />
        </Box>
        <Box display='flex' width='100%' height={30} justifyContent='center' alignItems='center'>
          <Skeleton width={15} height={25} sx={{ borderRadius: 1, ml: 1, mr: 2.6 }} />
          <Skeleton width='100%' height={25} sx={{ borderRadius: 1 }} />
        </Box>
      </Stack>
    </Stack>
  );
};
