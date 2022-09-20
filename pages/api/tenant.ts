import { IncomingMessage } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import { Endpoint } from '../../src/config/apiEndpoint';
import { get } from '../../src/lib/apiCall';
import { withSessionRoute } from '../../src/lib/withSession';

export default withSessionRoute(handler);

const buildAuthorization = (token: string) => ({
  Authorization: `Bearer ${token}`,
});

function isInvalidSession(req: NextApiRequest) {
  return req.session.user === undefined;
}

function unauthorized(res: NextApiResponse) {
  return res.status(401).json({ message: 'Unauthrozed access' });
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (isInvalidSession(req)) {
    return unauthorized(res);
  }

  const user = req.session.user;

  const apiResponse = await get(req, Endpoint.Tenant, { ...buildAuthorization(user!.token) });

  const payload = await apiResponse.json();

  return res.status(apiResponse.status).json(payload);
}
// return res.json([
//   {
//     id: 1,
//     name: 'John Doe',
//     color: 'primary',
//     unit: '2A-01-01',
//     status: 'Pemilik',
//     email: 'lombok.oc@gmail.com',
//     tenantStatus: 'Draft',
//     phone: '081234567890',
//     checkInDate: '01/01/2020',
//     checkOutDate: '-',
//   },
//   {
//     id: 2,
//     name: 'John Doe',
//     color: 'secondary',
//     unit: '2A-01-01',
//     status: 'Pemilik',
//     tenantStatus: 'Verified',
//     email: 'jane@mail.com',
//     phone: '081234567890',
//     checkInDate: '01/01/2020',
//     checkOutDate: '-',
//   },
// ]);
