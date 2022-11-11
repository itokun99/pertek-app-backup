import { NextApiRequest, NextApiResponse } from "next";
import { isInvalidSession, unauthorized } from "../../lib/apiAuthHelpers";
import { createController } from "./base";
import {
  getCompanyDepartment,
  createCompanyDepartment,
  updateCompanyDepartment,
  deleteCompanyDepartment,
  getCompanyDepartmentById,
} from "@backend/repos/company";

// get handler
async function handlerGet(req: NextApiRequest, res: NextApiResponse) {
  if (isInvalidSession(req)) {
    return unauthorized(res);
  }

  const [response, payload] = req.query?.id
    ? await getCompanyDepartmentById(req)
    : await getCompanyDepartment(req);

  if (!response.ok) {
    return res.status(response.status).json({ message: payload?.message });
  }

  return res.status(200).json(payload);
}

async function handlerPost(req: NextApiRequest, res: NextApiResponse) {
  if (isInvalidSession(req)) {
    return unauthorized(res);
  }

  const [response, payload] = await createCompanyDepartment(req);

  if (!response.ok) {
    return res.status(response.status).json({ message: payload.message });
  }

  return res.status(200).json({ message: "Success", data: payload });
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  if (isInvalidSession(req)) {
    return unauthorized(res);
  }

  const [response, payload] = await updateCompanyDepartment(req);

  if (!response.ok) {
    return res.status(response.status).json({ message: payload.message });
  }

  return res.status(200).json({ message: "Success", data: payload });
}

async function handlerDelete(req: NextApiRequest, res: NextApiResponse) {
  if (isInvalidSession(req)) {
    return unauthorized(res);
  }

  const [response, payload] = await deleteCompanyDepartment(req);

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
