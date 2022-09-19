import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { ReactElement, useContext, useEffect } from 'react';
import { redirectToAuth } from '../../lib/useRedirect';
import { withSessionSsr } from '../../lib/withSession';
import { AuthContext } from '../../src/provider/AuthProvider';
import ProtectedPage from '../../src/template/ProtectedPage';

export const getServerSideProps = withSessionSsr(({ req, res }) => {
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

const PengumumanIndex = ({ user }: any) => {
  const context = useContext(AuthContext);
  const { replace } = useRouter();

  useEffect(() => {
    if (!user) {
      replace('/login');
      return;
    }

    context.setUser(user.profile);
  }, [replace, context, user]);

  return <Typography>Pengumuman Index</Typography>;
};

PengumumanIndex.getLayout = (page: ReactElement) => <ProtectedPage>{page}</ProtectedPage>;

export default PengumumanIndex;
