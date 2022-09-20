import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import { ReactElement } from 'react';
import ProtectedPage from '../../src/template/ProtectedPage';

const TenantTable = dynamic(() => import('../../src/components/tables/TenantTable'), {
  ssr: false,
  suspense: true,
});

const TenantIndex = () => {
  return (
    <Suspense fallback={`Loading...`}>
      <TenantTable />
    </Suspense>
  );
};

TenantIndex.getLayout = (page: ReactElement) => <ProtectedPage>{page}</ProtectedPage>;

export default TenantIndex;
