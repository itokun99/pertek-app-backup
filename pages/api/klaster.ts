import { NextApiRequest, NextApiResponse } from "next";
import { Endpoint } from "../../src/config/apiEndpoint";
import {
  buildAuthorization,
  isInvalidSession,
  methodNotAlowed,
  unauthorized,
} from "../../src/lib/apiAuthHelpers";
import { get, post } from "../../src/lib/apiCall";
import { createRequestParams } from "../../src/lib/urllib";
import { withSessionRoute } from "../../src/lib/withSession";

export default withSessionRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (isInvalidSession(req)) {
    return unauthorized(res);
  }

  if (req.method === "GET") return handlerGet(req, res);
  if (req.method === "POST") return handlerPost(req, res);
  // if (req.method === "PUT") return handlerUpdate(req, res);

  return methodNotAlowed(res);
}

async function handlerGet(req: NextApiRequest, res: NextApiResponse) {
  if (isInvalidSession(req)) {
    return unauthorized(res);
  }

  const user = req.session.user;

  const params = createRequestParams(req.query);

  const apiResponse = await get(req, `${Endpoint.Klaster}?${params}`, {
    ...buildAuthorization(user!.token),
  });

  const payload = await apiResponse.json();

  return res.status(apiResponse.status).json(payload);
}

async function handlerPost(req: NextApiRequest, res: NextApiResponse) {
  if (isInvalidSession(req)) {
    return unauthorized(res);
  }

  const user = req.session.user;

  const apiResponse = await post(req, Endpoint.Klaster, { ...buildAuthorization(user!.token) });
  const responseBody = await apiResponse.json();

  if (!apiResponse.ok) {
    return res.status(apiResponse.status).json({ message: responseBody.message });
  }

  await req.session.save();
  return res.status(200).json({ message: "Successfully, Create new Cluster" });
}
