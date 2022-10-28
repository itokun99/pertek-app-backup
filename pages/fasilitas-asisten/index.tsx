import ProtectedPage from '@template/ProtectedPage';
import dynamic from 'next/dynamic';
import { ReactElement } from 'react';

const FacilityAssistanceView = dynamic(() => import('../../src/views/FacilityAssistantView'), {
  ssr: false,
  suspense: true,
});

const FacilityAssistancePage = () => <FacilityAssistanceView />;

FacilityAssistancePage.getLayout = (page: ReactElement) => <ProtectedPage>{page}</ProtectedPage>;

export default FacilityAssistancePage;
