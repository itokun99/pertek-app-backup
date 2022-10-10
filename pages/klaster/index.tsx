import { Container, Grid } from '@mui/material';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { CardLoader } from '../../src/components/loader/CardLoader';
import ProtectedPage from '../../src/template/ProtectedPage';

// const PropertyCard = dynamic(() => import('../../src/components/PropertyCard'), {
//   ssr: false,
//   suspense: true,
//   loading: () => <CardLoader />,
// });

const ClusterIndex = () => {
  return (
    <Container maxWidth='lg'>
      <Grid container spacing={3}>
        <Suspense>
          <div>Kluster</div>
        </Suspense>
      </Grid>
    </Container>
  );
};

ClusterIndex.getLayout = (page: any) => <ProtectedPage>{page}</ProtectedPage>;

export default ClusterIndex;
