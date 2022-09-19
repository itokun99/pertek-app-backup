import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { ReactElement, useContext, useEffect } from 'react';
import { AuthContext } from '../../src/provider/AuthProvider';

import { withSessionSsr } from '../../lib/withSession';
import { redirectToAuth } from '../../lib/useRedirect';
import ProtectedPage from '../../src/template/ProtectedPage';

export const getServerSideProps = withSessionSsr(async function getServerSideProps({ req, res }) {
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

const TokenIndex = ({ user }: any) => {
  const context = useContext(AuthContext);
  const { replace } = useRouter();

  useEffect(() => {
    if (user) {
      context.setUser(user.profile);
      return;
    }
    replace('/login');
  }, [user, context, replace]);

  return <Typography>Token Index</Typography>;
};

TokenIndex.getLayout = (page: ReactElement) => <ProtectedPage>{page}</ProtectedPage>;

export default TokenIndex;
