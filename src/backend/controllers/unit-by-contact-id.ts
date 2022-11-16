import { NextApiRequest, NextApiResponse } from "next";
import { isInvalidSession, unauthorized } from "../../lib/apiAuthHelpers";
import { createController } from "./base";
import { getUnitByContactID } from "@backend/repos/unit";

// get handler
async function handlerGet(req: NextApiRequest, res: NextApiResponse) {
  if (isInvalidSession(req)) {
    return unauthorized(res);
  }

  const [response, payload] = await getUnitByContactID(req);

  if (!response.ok) {
    return res.status(response.status).json({ message: payload?.message });
  }

  return res.status(200).json(payload);
}

const controller = createController({
  get: handlerGet,
});

export default controller;
