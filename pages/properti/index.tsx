import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { CardLoader } from '@components/loader/CardLoader';
import ProtectedPage from '@template/ProtectedPage';

const PropertyCard = dynamic(() => import('@components/PropertyCard'), {
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
