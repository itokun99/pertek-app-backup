import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(400).json({ message: 'Bad Request' });
  }

  const { username, password } = req.body;

  if (username !== 'admin' || password !== 'admin') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const serializedCookie = cookie.serialize('token', 'admin', {
    httpOnly: true,
    path: '/',
    secure: false,
    maxAge: 60 * 60 * 100,
  });

  return res.setHeader('Set-Cookie', serializedCookie).status(200).json({ username, password });
}
