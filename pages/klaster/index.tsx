import dynamic from 'next/dynamic';
import { ReactElement } from 'react';
import ProtectedPage from '../../src/template/ProtectedPage';

const ClusterView = dynamic(() => import('../../src/views/ClusterView'), {
  ssr: false,
});

const ClusterIndex = () => {
  return <ClusterView />;
};

ClusterIndex.getLayout = (page: ReactElement) => <ProtectedPage>{page}</ProtectedPage>;

export default ClusterIndex;
