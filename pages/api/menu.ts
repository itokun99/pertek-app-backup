import { NextApiRequest, NextApiResponse } from 'next';
import { getMenus } from '../../src/lib/menus';
import { withSessionRoute } from '../../src/lib/withSession';

export default withSessionRoute(handler);

function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowerd' });
  }

  const user = req.session.user;

  if (!user) {
    return res.status(401).json({ message: 'Akses tidak diizinkan' });
  }

  const menus = getMenus(user.profile['role']);

  return res.json(menus);
}
