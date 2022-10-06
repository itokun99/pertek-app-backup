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
      },
      {
        id: 2,
        name: "Tenant",
        url: "/tenant",
        icon: "people",
      },
      {
        id: 3,
        name: "Pengumuman",
        url: "/pengumuman",
        icon: "campaign",
      },
      {
        id: 4,
        name: "Penerimaan Paket",
        url: "/paket",
        icon: "widgets",
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
      {
        id: 7,
        name: "Visitor Manajemen",
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
      },
      {
        id: 2,
        name: "Pencatatan Meter",
        url: "/meter",
        icon: "homework",
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
    name: "Engineering",
    menus: [
      {
        id: 1,
        name: "Pemeliharaan & Perbaikan",
        url: "/pemeliharaan",
        icon: "homework",
      },
      {
        id: 1,
        name: "Inventori",
        url: "/Inventori",
        icon: "homework",
      },
      {
        id: 1,
        name: "Security",
        url: "/security",
        icon: "homework",
      },
      {
        id: 1,
        name: "Kebersihan",
        url: "/Kebersihan",
        icon: "homework",
      },
    ],
  },
  {
    id: 4,
    name: "Settings",
    menus: [
      {
        id: 1,
        name: "Master Properti",
        url: "/properti",
        icon: "homework",
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
