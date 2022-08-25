import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.json([
    {
      id: 1,
      name: 'John Doe',
      color: 'primary',
      unit: '2A-01-01',
      status: 'Pemilik',
      email: 'lombok.oc@gmail.com',
      tenantStatus: 'Draft',
      phone: '081234567890',
      checkInDate: '01/01/2020',
      checkOutDate: '-',
    },
    {
      id: 2,
      name: 'John Doe',
      color: 'secondary',
      unit: '2A-01-01',
      status: 'Pemilik',
      tenantStatus: 'Verified',
      email: 'jane@mail.com',
      phone: '081234567890',
      checkInDate: '01/01/2020',
      checkOutDate: '-',
    },
  ]);
}
