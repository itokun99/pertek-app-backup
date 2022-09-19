import { NextApiRequest } from 'next';

function clearSession(req: NextApiRequest) {
  req.session.destroy();
}

export const post = async (req: NextApiRequest, url: string) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req.body),
  });

  if (!response.ok) {
    clearSession(req);
  }

  return response;
};
