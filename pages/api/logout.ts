import { NextApiRequest, NextApiResponse } from 'next';
import { withSessionRoute } from '../../src/lib/withSession';

export default withSessionRoute(logoutHandler);

async function logoutHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.session.user) {
    if (req.method === 'POST') {
      req.session.destroy();

      return res.status(200).json({ message: 'Success' });
    }
  }
}
