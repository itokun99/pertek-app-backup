import { NextApiRequest, NextApiResponse } from 'next';
import { post } from '../../src/lib/apiCall';

import { withSessionRoute } from '../../src/lib/withSession';

export default withSessionRoute(loginHandler);

async function loginHandler(req: NextApiRequest, res: NextApiResponse) {
  const apiResponse = await post(req, 'https://xrqr-haey-y7wc.n7.xano.io/api:xG61OBxf/auth/login');

  const responseBody = await apiResponse.json();

  if (!apiResponse.ok) {
    return res.status(apiResponse.status).json({ message: responseBody.message });
  }

  req.session.user = {
    token: responseBody.session.token,
    profile: responseBody.user,
  };

  await req.session.save();
  return res.status(200).json({ message: 'Login Success' });
}
