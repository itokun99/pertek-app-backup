import { NextApiRequest, NextApiResponse } from 'next';
import { isInvalidSession, unauthorized } from '../../lib/apiAuthHelpers';
import { createProperty, deleteProperty, getProperty, updateProperty } from '../repos/property';
import { createController } from './base';

async function handlerGet(req: NextApiRequest, res: NextApiResponse) {
  if (isInvalidSession(req)) {
    return unauthorized(res);
  }

  //   const user = req.session.user;

  //   let endpoint = Endpoint.Property;
  //   if (Object.keys(req.query).length > 0) {
  //     const params = createRequestParams(req.query);
  //     endpoint = `${Endpoint.Property}?${params}`;
  //   }

  const [response, payload] = await getProperty(req);

  if (!response.ok) {
    return res.status(response.status).json({ message: payload.message });
  }

  return res.status(response.status).json(payload);
}

async function handlerPost(req: NextApiRequest, res: NextApiResponse) {
  if (isInvalidSession(req)) {
    return unauthorized(res);
  }

  const [response, payload] = await createProperty(req);

  if (!response.ok) {
    return res.status(response.status).json({ message: payload.message });
  }

  return res.status(response.status).json(payload);
}

async function handlerPut(req: NextApiRequest, res: NextApiResponse) {
  if (isInvalidSession(req)) {
    return unauthorized(res);
  }

  const [response, payload] = await updateProperty(req);

  if (!response.ok) {
    return res.status(response.status).json({ message: payload.message });
  }

  return res.status(response.status).json(payload);
}

async function handlerDelete(req: NextApiRequest, res: NextApiResponse) {
  if (isInvalidSession(req)) {
    return unauthorized(res);
  }

  const [response, payload] = await deleteProperty(req);

  if (!response.ok) {
    return res.status(response.status).json({ message: payload.message });
  }

  return res.status(response.status).json(payload);
}

const propertyController = createController({
  get: handlerGet,
  post: handlerPost,
  put: handlerPut,
  delete: handlerDelete,
});

export default propertyController;
