import { NextApiRequest, NextApiResponse } from 'next';
import { isInvalidSession, unauthorized } from '../../lib/apiAuthHelpers';
import { createBooking, deleteBooking, getBooking, updateBooking, updateStatusBooking } from '../repos/booking';
import { createController } from './base';

async function handlerGet(req: NextApiRequest, res: NextApiResponse) {
  if (isInvalidSession(req)) {
    return unauthorized(res);
  }

  const [response, payload] = await getBooking(req);

  if (!response.ok) {
    return res.status(response.status).json({ message: payload.message });
  }

  return res.status(response.status).json(payload);
}

async function handlerPost(req: NextApiRequest, res: NextApiResponse) {
  if (isInvalidSession(req)) {
    return unauthorized(res);
  }

  const [response, payload] = await createBooking(req);

  if (!response.ok) {
    return res.status(response.status).json({ message: payload.message });
  }

  return res.status(response.status).json({ message: 'Success', data: payload });
}

async function handlerPut(req: NextApiRequest, res: NextApiResponse) {
  if (isInvalidSession(req)) {
    return unauthorized(res);
  }

  const [response, payload] =
    req.query.status !== undefined ? await updateStatusBooking(req) : await updateBooking(req);

  if (!response.ok) {
    return res.status(response.status).json({ message: payload.message });
  }

  return res.status(response.status).json(payload);
}

async function handlerDelete(req: NextApiRequest, res: NextApiResponse) {
  if (isInvalidSession(req)) {
    return unauthorized(res);
  }
  const [response, payload] = await deleteBooking(req);

  if (!response.ok) {
    return res.status(response.status).json({ message: payload.message });
  }

  return res.status(response.status).json({ message: 'Success', data: payload });
}

const bookingController = createController({
  get: handlerGet,
  post: handlerPost,
  put: handlerPut,
  delete: handlerDelete,
});

export default bookingController;
