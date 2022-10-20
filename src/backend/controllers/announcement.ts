import { NextApiRequest, NextApiResponse } from 'next';
import { isInvalidSession, unauthorized } from '../../lib/apiAuthHelpers';
import { createAnnouncement, deleteAnnouncement, getAnnouncement, updateAnnouncement } from '../repos/announcement';
import { createController } from './base';

async function handlerGet(req: NextApiRequest, res: NextApiResponse) {
  if (isInvalidSession(req)) {
    return unauthorized(res);
  }

  const [response, payload] = await getAnnouncement(req);
  if (!response.ok) {
    return res.status(response.status).json({ message: payload.message });
  }

  return res.status(response.status).json(payload);
}

async function handlerPost(req: NextApiRequest, res: NextApiResponse) {
  if (isInvalidSession(req)) {
    return unauthorized(res);
  }

  const [response, payload] = await createAnnouncement(req);
  if (!response.ok) {
    return res.status(response.status).json({ message: payload.message });
  }

  return res.status(200).json({ message: 'Success', data: payload });
}

async function handlerPut(req: NextApiRequest, res: NextApiResponse) {
  if (isInvalidSession(req)) {
    return unauthorized(res);
  }

  const [response, payload] = await updateAnnouncement(req);
  if (!response.ok) {
    return res.status(response.status).json({ message: payload.message });
  }

  return res.status(200).json({ message: 'Success', data: payload });
}

async function handlerDelete(req: NextApiRequest, res: NextApiResponse) {
  if (isInvalidSession(req)) {
    return unauthorized(res);
  }

  const [response, payload] = await deleteAnnouncement(req);
  if (!response.ok) {
    return res.status(response.status).json({ message: payload.message });
  }

  return res.status(200).json({ message: 'Success', data: payload });
}

const announcementControllers = createController({
  get: handlerGet,
  post: handlerPost,
  put: handlerPut,
  delete: handlerDelete,
});

export default announcementControllers;
