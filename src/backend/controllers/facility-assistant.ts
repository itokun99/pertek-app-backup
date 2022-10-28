import { createController } from './base';

import { NextApiRequest, NextApiResponse } from 'next';
import { isInvalidSession, unauthorized } from '../../lib/apiAuthHelpers';
import {
  createFacilityAssistant,
  deleteFacilityAssistant,
  getFacilityAssistant,
  updateFacilityAssistant,
} from '@backend/repos/facility-assistant';

async function handlerGet(req: NextApiRequest, res: NextApiResponse) {
  if (isInvalidSession(req)) {
    return unauthorized(res);
  }

  const [response, payload] = await getFacilityAssistant(req);

  if (!response.ok) {
    return res.status(response.status).json({ message: payload.message });
  }

  return res.status(response.status).json(payload);
}

async function handlerPost(req: NextApiRequest, res: NextApiResponse) {
  if (isInvalidSession(req)) {
    return unauthorized(res);
  }

  const [response, payload] = await createFacilityAssistant(req);

  if (!response.ok) {
    return res.status(response.status).json({ message: payload.message });
  }

  return res.status(response.status).json({ message: 'Success', data: payload });
}

async function handlerPut(req: NextApiRequest, res: NextApiResponse) {
  if (isInvalidSession(req)) {
    return unauthorized(res);
  }

  const [response, payload] = await updateFacilityAssistant(req);

  if (!response.ok) {
    return res.status(response.status).json({ message: payload.message });
  }

  return res.status(response.status).json({ message: 'Success', data: payload });
}

async function handlerDelete(req: NextApiRequest, res: NextApiResponse) {
  if (isInvalidSession(req)) {
    return unauthorized(res);
  }

  const [response, payload] = await deleteFacilityAssistant(req);

  if (!response.ok) {
    return res.status(response.status).json({ message: payload.message });
  }

  return res.status(response.status).json({ message: 'Success', data: payload });
}

const facilityAssistantController = createController({
  get: handlerGet,
  post: handlerPost,
  delete: handlerDelete,
  put: handlerPut,
});

export default facilityAssistantController;
