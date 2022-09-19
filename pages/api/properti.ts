import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies['token'];

  if (req.method === 'GET') {
    const res = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:dhVjwBnw/property', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  }
}
