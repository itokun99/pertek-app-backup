import { useContext, useEffect } from 'react';
import { AuthContext } from '../src/provider/AuthProvider';
import { useRouter } from 'next/router';
import { withSessionSsr } from '../src/lib/withSession';
import { redirectToAuth } from '../src/lib/useRedirect';

export const getServerSideProps = withSessionSsr(({ req, res }) => {
  const session = req?.session;

  if (!session.user) {
    return redirectToAuth(res);
  }

  res.setHeader('location', '/dashboard');
  res.statusCode = 302;
  res.end();

  return {
    props: {
      user: session.user,
    },
  };
});

const Home = ({ user }: any) => {
  const { replace } = useRouter();
  const context = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      replace('/login');
      return;
    }

    context.setUser(user);
    replace('/dashboard');
  }, [replace, user, context]);

  return <></>;
};

export default Home;
