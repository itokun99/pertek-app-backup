import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(400).json({ message: 'Bad Request' });
  }

  const { identity, password } = req.body;
  const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:xG61OBxf/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: req.body.identity,
      password: req.body.password,
    }),
  });

  if (!response.ok) {
    return res.status(401).json({ message: 'Login gagal! periksa kembali identitas dan password Anda' });
  }

  const payload = await response.json();

  const serializedCookie = cookie.serialize('token', payload.authToken, {
    httpOnly: true,
    path: '/',
    secure: false,
    maxAge: 60 * 60 * 100,
  });

  return res.setHeader('Set-Cookie', serializedCookie).status(200).json({ message: 'OK' });
}
