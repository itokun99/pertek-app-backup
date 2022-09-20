export const menus = [
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
            url: '/tenant',
          },
          {
            id: 2,
            name: 'Tambah',
            url: '/tenant/tambah',
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
            url: '/pengumuman/list',
          },
          {
            id: 2,
            name: 'Buat Baru',
            url: '/pengumuman/baru',
          },
        ],
      },
      {
        id: 3,
        name: 'Penerimaan Paket',
        url: '/paket',
        icon: 'widgets',
        submenus: [
          {
            id: 1,
            name: 'List',
            url: '/paket/list',
          },
          {
            id: 2,
            name: 'Tambah',
            url: '/paket/baru',
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
        url: '/token',
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

export enum UserRole {}

export const getMenus = (role: UserRole) => {
  console.log(role);
  return menus;
};
