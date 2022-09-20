import { NextApiRequest } from 'next';

function clearSession(req: NextApiRequest) {
  req.session.destroy();
}

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

export const get = async (req: NextApiRequest, url: string, headers?: {}) => {
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });

  if (res.status === 401) {
    clearSession(req);
  }

  return res;
};
