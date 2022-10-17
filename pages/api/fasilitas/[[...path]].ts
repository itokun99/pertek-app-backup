import { NextApiRequest, NextApiResponse } from 'next';
import { Endpoint } from '../../../src/config/apiEndpoint';
import { buildAuthorization, isInvalidSession, unauthorized } from '../../../src/lib/apiAuthHelpers';
import { get } from '../../../src/lib/apiCall';
import { createRequestParams } from '../../../src/lib/urllib';
import { withSessionRoute } from '../../../src/lib/withSession';

export default withSessionRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (isInvalidSession(req)) {
    return unauthorized(res);
  }

  const user = req.session.user;

  const params = createRequestParams(req.query);

  let endpoint = Endpoint.Facility;

  const path = req.query?.path;

  if (path?.includes('stats')) {
    endpoint = Endpoint.FacilityBookingStats;
  }

  if (path?.includes('booking')) {
    endpoint = Endpoint.FacilityBooking;
  }

  if (path?.includes('category')) {
    endpoint = Endpoint.FacilityCategory;
  }

  const apiResponse = await get(req, `${endpoint}?${params}`, {
    ...buildAuthorization(user!.token),
  });

  const payload = await apiResponse.json();

  console.log(req.url);

  return res.status(apiResponse.status).json(payload);
}
