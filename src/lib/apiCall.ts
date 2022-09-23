import { NextApiRequest } from 'next';
import { clearSession } from './apiAuthHelpers';

export const post = async (req: NextApiRequest, url: string, headers?: {}) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(req.body),
  });

  if (res.status === 401) {
    clearSession(req);
  }

  return res;
};

export const get = async (req: NextApiRequest, url: string, headers?: {}, body?: BodyInit) => {
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body,
  });

  if (res.status === 401) {
    clearSession(req);
  }

  return res;
};
