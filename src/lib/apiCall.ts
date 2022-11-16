import { NextApiRequest } from 'next';
import { clearSession } from './apiAuthHelpers';

export const requestDelete = async (req: NextApiRequest, url: string, headers?: {}) => {
  const res = await fetcher(url, 'DELETE', headers, req.body);
  if (res.status === 401) {
    clearSession(req);
  }

  return res;
};

export const put = async (req: NextApiRequest, url: string, headers?: {}) => {
  const res = await fetcher(url, 'PUT', headers, req.body);
  if (res.status === 401) {
    clearSession(req);
  }

  return res;
};

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

type RequestMethodType = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';
interface IApiRequest {
  req: NextApiRequest;
  url: string;
  method: RequestMethodType;
  body?: BodyInit | null;
  headers?: {};
}

export const apiRequest = async ({ req, url, method = 'GET', body, headers }: IApiRequest) => {
  const token = req?.session?.user ? req.session.user.token : '';

  const res = await fetcher(
    url,
    method,
    {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    body
  );

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
    // console.log("Fetching API", url, method, headers, body);
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body,
    });

    // console.log("Success Fetching API", res, url, method, headers, body);
    return res;
  } catch (e) {
    // console.log("Error Fetching API", e, url, method, headers, body);
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
