import ProtectedPage from '@template/ProtectedPage';
import dynamic from 'next/dynamic';
import { ReactElement } from 'react';

const FacilityDetailView = dynamic(() => import('@views/FacilityDetailView'), {
  ssr: false,
});

const FacilityDetail = () => <FacilityDetailView />;

FacilityDetail.getLayout = (page: ReactElement) => <ProtectedPage>{page}</ProtectedPage>;

export default FacilityDetail;
