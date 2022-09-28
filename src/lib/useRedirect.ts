import { ServerResponse } from 'http';

const redirectToAuth = (res: ServerResponse) => {
  res.setHeader('location', '/login');
  res.statusCode = 302;
  res.end();
  return {
    props: {
      user: {},
    },
  };
};
