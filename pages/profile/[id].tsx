import { ReactNode } from 'react';
import ProtectedPage from '../../src/template/ProtectedPage';

const ProfilePage = () => {
  return <></>;
};

ProfilePage.getLayout = (page: ReactNode) => <ProtectedPage>{page}</ProtectedPage>;

export default ProfilePage;
