import { NextApiRequest, NextApiResponse } from "next";
import {
  isInvalidSession,
  unauthorized,
} from "../../lib/apiAuthHelpers";
import { createController } from './base';
import { getCluster, createCluster, updateCluster, deleteCluster } from '../repos/properti';

// get handler
async function handlerGet(req: NextApiRequest, res: NextApiResponse) {
  if (isInvalidSession(req)) {
    return unauthorized(res);
  }
  const [response, payload] = await getCluster(req);

  if(!response.ok) {
    return res.status(response.status).json({ message: payload.message })
  }

  return res.status(200).json(payload);
}

async function handlerPost(req: NextApiRequest, res: NextApiResponse) {
  if (isInvalidSession(req)) {
    return unauthorized(res);
  }

  const [response, payload] = await createCluster(req);
  
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

  const [response, payload] = await updateCluster(req);

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

  const [response, payload] = await deleteCluster(req);

  if (!response.ok) {
    return res.status(response.status).json({ message: response.message });
  }

  await req.session.save();
  return res.status(200).json({ message: "Success", data: payload });
}

const clusterController = createController({
  get: handlerGet,
  post: handlerPost,
  put: handlePut,
  delete: handlerDelete
});


export default clusterController;