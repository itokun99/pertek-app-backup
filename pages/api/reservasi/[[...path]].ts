import { NextApiRequest, NextApiResponse } from "next";
import { Endpoint } from "../../../src/config/apiEndpoint";
import {
  buildAuthorization,
  isInvalidSession,
  unauthorized,
} from "../../../src/lib/apiAuthHelpers";
import { get } from "../../../src/lib/apiCall";
import { createRequestParams } from "../../../src/lib/urllib";
import { withSessionRoute } from "../../../src/lib/withSession";

export default withSessionRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (isInvalidSession(req)) {
    return unauthorized(res);
  }

  const user = req.session.user;

  const params = createRequestParams(req.query);

  let endpoint = `${Endpoint.FacilityBooking}`;

  if (req.query?.path?.includes("stats")) {
    endpoint = `${Endpoint.FacilityBookingStats}`;
  }

  console.log(req.query);

  const apiResponse = await get(req, `${endpoint}?${params}`, {
    ...buildAuthorization(user!.token),
  });

  const payload = await apiResponse.json();

  return res.status(apiResponse.status).json(payload);
}
