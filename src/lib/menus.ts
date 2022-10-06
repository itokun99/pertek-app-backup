export const menus = [
  {
    id: 1,
    name: "Tenant Relation",
    menus: [
      {
        id: 1,
        name: "Kontak",
        url: "/kontak",
        icon: "people",
        // submenus: [
        //   {
        //     id: 1,
        //     name: "List",
        //     url: "/kontak",
        //   },
        //   {
        //     id: 2,
        //     name: "Tambah",
        //     url: "",
        //   },
        // ],
      },
      {
        id: 2,
        name: "Tenant",
        url: "/tenant",
        icon: "people",
        // submenus: [
        //   {
        //     id: 1,
        //     name: "List",
        //     url: "/tenant",
        //   },
        //   {
        //     id: 2,
        //     name: "Tambah",
        //     url: "",
        //   },
        // ],
      },
      {
        id: 3,
        name: "Pengumuman",
        url: "/pengumuman",
        icon: "campaign",
        // submenus: [
        //   {
        //     id: 1,
        //     name: "List",
        //     url: "/pengumuman",
        //   },
        //   {
        //     id: 2,
        //     name: "Buat Baru",
        //     url: "/pengumuman/baru",
        //   },
        // ],
      },
      {
        id: 4,
        name: "Penerimaan Paket",
        url: "/paket",
        icon: "widgets",
        // submenus: [
        //   {
        //     id: 1,
        //     name: "List",
        //     url: "/paket",
        //   },
        //   {
        //     id: 2,
        //     name: "Tambah",
        //     url: "/paket/baru",
        //   },
        // ],
      },
      {
        id: 5,
        name: "Pelaporan",
        url: "/pelaporan",
        icon: "report",
      },
      {
        id: 6,
        name: "Reservasi Fasilitas",
        url: "/reservasi",
        icon: "bolt",
      },
    ],
  },
  {
    id: 2,
    name: "Keuangan",
    menus: [
      {
        id: 1,
        name: "Invoice",
        url: "/invoice",
        icon: "homework",
        // submenus: [
        //   {
        //     name: "Daftar",
        //     url: "/properti",
        //   },
        //   {
        //     name: "Tambah",
        //     url: "/properti/tambah",
        //   },
        // ],
      },
      {
        id: 2,
        name: "Token Listrik",
        url: "/token",
        icon: "bolt",
      },
    ],
  },
  {
    id: 3,
    name: "Settings",
    menus: [
      {
        id: 1,
        name: "Master Properti",
        url: "/properti",
        icon: "homework",
        // submenus: [
        //   {
        //     name: "Daftar",
        //     url: "/properti",
        //   },
        //   {
        //     name: "Tambah",
        //     url: "/properti/tambah",
        //   },
        // ],
      },
    ],
  },
];

export enum UserRole {
  SuperAdmin = "Super Admin",
}

export const getMenus = (role: UserRole) => {
  return menus;
};
