import { NextApiRequest, NextApiResponse } from 'next';
import { Endpoint } from '../../src/config/apiEndpoint';
import { post } from '../../src/lib/apiCall';

import { withSessionRoute } from '../../src/lib/withSession';

export default withSessionRoute(loginHandler);

async function loginHandler(req: NextApiRequest, res: NextApiResponse) {
  const apiResponse = await post(req, Endpoint.Login);

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
