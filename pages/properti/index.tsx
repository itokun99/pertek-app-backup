import { Container, Grid } from '@mui/material';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { CardLoader } from '../../src/components/loader/CardLoader';
import ProtectedPage from '../../src/template/ProtectedPage';

const PropertyCard = dynamic(() => import('../../src/components/PropertyCard'), {
  ssr: false,
  suspense: true,
  loading: () => <CardLoader />,
});

const PropertyIndex = () => {
  return (
    <Container maxWidth='lg'>
      <Grid container spacing={3}>
        <Suspense>
          <PropertyCard />
        </Suspense>
      </Grid>
    </Container>
  );
};

PropertyIndex.getLayout = (page: any) => <ProtectedPage>{page}</ProtectedPage>;

export default PropertyIndex;
