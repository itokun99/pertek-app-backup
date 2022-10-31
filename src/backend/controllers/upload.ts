import { uploadFile } from '@backend/repos/upload';
import { isInvalidSession, unauthorized } from '@lib/apiAuthHelpers';
import { NextApiRequest, NextApiResponse } from 'next';
import { createController } from './base';

const handlerPost = async (req: NextApiRequest, res: NextApiResponse) => {
  //   if (isInvalidSession(req)) {
  //     return unauthorized(res);
  //   }

  console.log('req.body', req.body);

  const [response, payload] = await uploadFile(req);

  if (!response.ok) {
    return res.status(response.status).json({ message: payload.message });
  }

  return res.status(response.status).json(payload);
};

const uploadController = createController({
  post: handlerPost,
  // put: handlePut,
  // delete: handlerDelete,
});

export default uploadController;
