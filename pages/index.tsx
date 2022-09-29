import { useContext, useEffect } from 'react';
import { AuthContext } from '../src/provider/AuthProvider';
import { useRouter } from 'next/router';
import { withSessionSsr } from '../src/lib/withSession';

export const getServerSideProps = withSessionSsr(({ req, res }) => {
  const session = req?.session;
  let location = '/dashboard';
  let code = 302;
  if (!session.user) {
    location = '/login';
    code = 301;
  }

  res.setHeader('location', location);
  res.statusCode = code;
  res.end();

  return {
    props: {
      user: session.user || undefined,
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
