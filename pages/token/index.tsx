import { Typography } from '@mui/material';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { ReactElement, useContext } from 'react';
import { AuthContext } from '../../src/provider/AuthProvider';
import WithAppBar from '../../src/template/WithAppBar';

import { withSessionSsr } from '../../lib/withSession';

export const getServerSideProps = withSessionSsr(async function getServerSideProps({ req }) {
  return {
    props: {
      user: req?.session.user?.profile || null,
    },
  };
});

const TokenIndex = ({ user }: any) => {
  const { setUser } = useContext(AuthContext);
  const router = useRouter();

  setUser(user);

  return <Typography>Token Index</Typography>;
};

TokenIndex.getLayout = (page: ReactElement) => <WithAppBar>{page}</WithAppBar>;

export default TokenIndex;
