import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { PropsWithChildren, ReactElement, useContext, useEffect } from 'react';
import { redirectToAuth } from '../../src/lib/useRedirect';
import { withSessionSsr } from '../../src/lib/withSession';
import { AuthContext, UserModel } from '../../src/provider/AuthProvider';
import ProtectedPage from '../../src/template/ProtectedPage';

export const getServerSideProps = withSessionSsr(async ({ req, res }) => {
  const session = req?.session;

  if (!session.user) {
    return redirectToAuth(res);
  }

  return {
    props: {
      user: session.user,
    },
  };
});

const PengumumanList = ({ user }: any) => {
  const { replace } = useRouter();
  const context = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      context.setUser(user.profile);
    } else {
      replace('/login');
    }
  }, [user, replace, context]);

  return <Typography>Pengumuman List</Typography>;
};

PengumumanList.getLayout = (page: ReactElement) => <ProtectedPage>{page}</ProtectedPage>;

export default PengumumanList;
