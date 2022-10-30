import { Suspense, ReactElement } from 'react';
import dynamic from 'next/dynamic';
import ProtectedPage from '@template/ProtectedPage';

const TenantView = dynamic(() => import('@views/TenantView'), {
  ssr: false,
});

const TenantPage = () => {
  return <TenantView />;
};

TenantPage.getLayout = (page: ReactElement) => <ProtectedPage>{page}</ProtectedPage>;

export default TenantPage;
