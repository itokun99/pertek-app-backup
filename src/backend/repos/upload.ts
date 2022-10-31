import { apiRequest } from '@lib/apiCall';
import { ApiResponseType, IUpload } from '@types';
import { NextApiRequest } from 'next';

export const uploadFile = async (req: NextApiRequest): Promise<[Response, ApiResponseType<IUpload>]> => {
  const uploadEndpoint = `${process.env.UPLOAD_IO_URL}/accounts/${process.env.UPLOAD_IO_ACCOUNT_ID}/uploads/binary`;

  console.log('uploadEndpoint', process.env.UPLOAD_IO_API_KEY);

  //   const formData = new FormData();
  //   formData.append('file', req.body);

  //   let payload = {
  //     metadata: {},
  //     mime: file.type,
  //     originalFileName: file.name,
  //     size: file.size,
  //     tags: [],
  //   };

  const response = await apiRequest({
    req,
    url: uploadEndpoint,
    method: 'POST',
    body: req.body,
    headers: {
      Authorization: `Bearer ${process.env.UPLOAD_IO_API_KEY}`,
      'Content-Type': 'image/png',
    },
  });

  console.log('response', response);

  const payload = await response.json();

  return [response, payload];
};
