import { NextApiRequest, NextApiResponse } from 'next';

const menus = [
  {
    id: 1,
    name: 'Tenant Relation',
    menus: [
      {
        id: 1,
        name: 'Tenant Manajemen',
        url: '/tenant',
        icon: 'people',
        submenus: [
          {
            id: 1,
            name: 'List',
            url: '/tenant/list',
          },
          {
            id: 2,
            name: 'Tambah',
            url: '/tenant/baru',
          },
        ],
      },
      {
        id: 2,
        name: 'Pengumuman',
        url: '/pengumuman',
        icon: 'campaign',
        submenus: [
          {
            id: 1,
            name: 'List',
            url: '/tenant/list',
          },
          {
            id: 2,
            name: 'Buat Baru',
            url: '/tenant/baru',
          },
        ],
      },
      {
        id: 3,
        name: 'Penerimaan Paket',
        url: '/penerimaan-paket',
        icon: 'widgets',
        submenus: [
          {
            id: 1,
            name: 'List',
            url: '/tenant/list',
          },
          {
            id: 2,
            name: 'Tambah',
            url: '/tenant/baru',
          },
        ],
      },
      {
        id: 4,
        name: 'Pelaporan',
        url: '/pelaporan',
        icon: 'report',
      },
      {
        id: 5,
        name: 'Token Listrik',
        url: '/token-listrik',
        icon: 'bolt',
      },
    ],
  },
  {
    id: 2,
    name: 'Settings',
    menus: [
      {
        id: 1,
        name: 'Master Properti',
        url: '/properti',
        icon: 'homework',
        submenus: [
          {
            name: 'Daftar',
            url: '/properti/list',
          },
          {
            name: 'Tambah',
            url: '/properti/tambah',
          },
        ],
      },
    ],
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.json(menus);
}
