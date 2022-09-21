import { NextApiRequest, NextApiResponse } from 'next';
import { isInvalidSession, methodNotAlowed, unauthorized } from '../../src/lib/apiAuthHelpers';
import { withSessionRoute } from '../../src/lib/withSession';

export default withSessionRoute(logoutHandler);

async function logoutHandler(req: NextApiRequest, res: NextApiResponse) {
  if (isInvalidSession(req)) {
    return unauthorized(res);
  }

  if (req.method !== 'POST') return methodNotAlowed(res);

  req.session.destroy();

  return res.status(200).json({ message: 'Success' });
}
