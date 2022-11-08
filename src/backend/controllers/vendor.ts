import { NextApiRequest, NextApiResponse } from "next";
import { isInvalidSession, unauthorized } from "../../lib/apiAuthHelpers";
import { createController } from "./base";
import {
  getVendor,
  createVendor,
  updateVendor,
  deleteVendor,
  getVendorById,
} from "@backend/repos/vendor";

// get handler
async function handlerGet(req: NextApiRequest, res: NextApiResponse) {
  if (isInvalidSession(req)) {
    return unauthorized(res);
  }

  const [response, payload] = req.query?.id ? await getVendorById(req) : await getVendor(req);

  if (!response.ok) {
    return res.status(response.status).json({ message: payload?.message });
  }

  return res.status(200).json(payload);
}

async function handlerPost(req: NextApiRequest, res: NextApiResponse) {
  if (isInvalidSession(req)) {
    return unauthorized(res);
  }

  const [response, payload] = await createVendor(req);

  if (!response.ok) {
    return res.status(response.status).json({ message: payload.message });
  }

  return res.status(200).json({ message: "Success", data: payload });
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  if (isInvalidSession(req)) {
    return unauthorized(res);
  }

  const [response, payload] = await updateVendor(req);

  if (!response.ok) {
    return res.status(response.status).json({ message: payload.message });
  }

  return res.status(200).json({ message: "Success", data: payload });
}

async function handlerDelete(req: NextApiRequest, res: NextApiResponse) {
  if (isInvalidSession(req)) {
    return unauthorized(res);
  }

  const [response, payload] = await deleteVendor(req);

  if (!response.ok) {
    return res.status(response.status).json({ message: response.message });
  }

  return res.status(200).json({ message: "Success", data: payload });
}

const controller = createController({
  get: handlerGet,
  post: handlerPost,
  put: handlePut,
  delete: handlerDelete,
});

export default controller;
