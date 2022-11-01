import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import ProtectedPage from '@template/ProtectedPage';

const PropertyView = dynamic(() => import('@views/PropertyView'), {
  ssr: false,
  suspense: true,
});

const PropertyPage = () => {
  return (
    <Suspense>
      <PropertyView />
    </Suspense>
  );
};

PropertyPage.getLayout = (page: any) => <ProtectedPage>{page}</ProtectedPage>;

export default PropertyPage;
