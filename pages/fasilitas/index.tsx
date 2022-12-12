import ProtectedPage from '@template/ProtectedPage';
import dynamic from 'next/dynamic';
import { ReactElement } from 'react';

const FasilitasView = dynamic(() => import('../../src/views/FacilityView'), {
  ssr: false
});

const FasilitasPage = () => <FasilitasView />;

FasilitasPage.getLayout = (page: ReactElement) => <ProtectedPage>{page}</ProtectedPage>;

export default FasilitasPage;
