import ProtectedPage from '@template/ProtectedPage';
import dynamic from 'next/dynamic';
import { ReactElement } from 'react';

const TenantView = dynamic(() => import('@views/TenantView'), {
  ssr: false,
});

const TenantPage = () => {
  return <TenantView />;
};

TenantPage.getLayout = (page: ReactElement) => <ProtectedPage>{page}</ProtectedPage>;

export default TenantPage;
