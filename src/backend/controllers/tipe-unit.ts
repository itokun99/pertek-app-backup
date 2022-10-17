import { NextApiRequest, NextApiResponse } from "next";
import {
  isInvalidSession,
  unauthorized,
} from "../../lib/apiAuthHelpers";
import { createController } from './base';
import { getUnitType, createUnitType, updateUnitType, deleteUnitType } from '../repos/properti';

// get handler
async function handlerGet(req: NextApiRequest, res: NextApiResponse) {
  if (isInvalidSession(req)) {
    return unauthorized(res);
  }
  const [response, payload] = await getUnitType(req);

  if(!response.ok) {
    return res.status(response.status).json({ message: payload.message })
  }

  return res.status(200).json(payload);
}

async function handlerPost(req: NextApiRequest, res: NextApiResponse) {
  if (isInvalidSession(req)) {
    return unauthorized(res);
  }

  const [response, payload] = await createUnitType(req);
  
  if(!response.ok) {
    return res.status(response.status).json({ message: payload.message });
  }

  await req.session.save();
  return res.status(200).json({ message: "Success", data: payload });
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  if (isInvalidSession(req)) {
    return unauthorized(res);
  }

  const [response, payload] = await updateUnitType(req);

  if (!response.ok) {
    return res.status(response.status).json({ message: payload.message });
  }

  await req.session.save();
  return res.status(200).json({ message: "Success", data: payload });
}

async function handlerDelete(req: NextApiRequest, res: NextApiResponse) {
  if (isInvalidSession(req)) {
    return unauthorized(res);
  }

  const [response, payload] = await deleteUnitType(req);

  if (!response.ok) {
    return res.status(response.status).json({ message: response.message });
  }

  await req.session.save();
  return res.status(200).json({ message: "Success", data: payload });
}

const controller = createController({
  get: handlerGet,
  post: handlerPost,
  put: handlePut,
  delete: handlerDelete
});


export default controller;