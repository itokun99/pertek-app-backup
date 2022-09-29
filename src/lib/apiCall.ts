import { NextApiRequest } from 'next';
import { clearSession } from './apiAuthHelpers';

export const post = async (req: NextApiRequest, url: string, headers?: {}) => {
  const res = await fetcher(url, 'POST', headers, req.body);
  if (res.status === 401) {
    clearSession(req);
  }

  return res;
};

export const get = async (req: NextApiRequest, url: string, headers?: {}, body?: BodyInit) => {
  const res = await fetcher(url, 'GET', headers, body);

  if (res.status === 401) {
    clearSession(req);
  }

  return res;
};

async function fetcher(
  url: string,
  method?: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE',
  headers?: {},
  body?: BodyInit | null | undefined
) {
  try {
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body,
    });
    return res;
  } catch (e) {
    return new Response(
      JSON.stringify({
        message: `Glitch happend in our backend. Please retry shortly...`,
      }),
      {
        status: 500,
      }
    );
  }
}
