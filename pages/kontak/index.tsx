import { Suspense, ReactElement } from 'react';
import dynamic from 'next/dynamic';
import ProtectedPage from '@template/ProtectedPage';

const ContactView = dynamic(() => import('@views/ContactView'), {
  ssr: false,
});

const ContactPage = () => {
  return <ContactView />;
};

ContactPage.getLayout = (page: ReactElement) => <ProtectedPage>{page}</ProtectedPage>;

export default ContactPage;
