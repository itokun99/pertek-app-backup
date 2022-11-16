import ProtectedPage from '@template/ProtectedPage';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

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
