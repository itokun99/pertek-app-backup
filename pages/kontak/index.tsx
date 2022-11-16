import ProtectedPage from '@template/ProtectedPage';
import dynamic from 'next/dynamic';
import { ReactElement } from 'react';

const ContactView = dynamic(() => import('@views/ContactView'), {
  ssr: false,
});

const ContactPage = () => {
  return <ContactView />;
};

ContactPage.getLayout = (page: ReactElement) => <ProtectedPage>{page}</ProtectedPage>;

export default ContactPage;
