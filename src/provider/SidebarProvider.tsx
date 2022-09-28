import { createContext, PropsWithChildren, useMemo, useState } from 'react';
import useSWR from 'swr';
import { SidebarMenuGroup } from '../components/sidebar';
import { getCookie, setCookie } from 'cookies-next';

export type Property = {
  id: number;
  name: string;
  address: string;
  type: string;
  total_unit: number;
  total_cluster: number;
};

export type ActiveMenu = {
  parentId: string;
  childId: string;
};

export interface SidebarContextInterface {
  menuGroups: SidebarMenuGroup[];
  activeMenu?: ActiveMenu;
  activeProperty?: Property;
  open: boolean;
  setActiveProperty: (property: Property) => void;
  setOpen: (state: boolean) => void;
  setActiveMenu: (data: { parentId: string; childId: string }) => void;
}

export const SidebarContext = createContext<SidebarContextInterface>({
  menuGroups: [],
  open: true,
  setActiveProperty: (_) => {},
  setOpen: (_) => null,
  setActiveMenu: (_) => {},
});

export const SidebarProvider = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState<ActiveMenu | undefined>();

  const activePropertyInCookie = getCookie('activeProperty');
  let activePropertyState = undefined;
  if (activePropertyInCookie) {
    activePropertyState = JSON.parse(activePropertyInCookie as string);
  }

  const [activeProperty, setActiveProperty] = useState<Property | undefined>(activePropertyState);

  const updateProperty = (property: Property) => {
    setCookie('activeProperty', property);
    setActiveProperty(property);
  };

  const { data } = useSWR('/api/menu');

  const value = useMemo<SidebarContextInterface>(
    () => ({
      open,
      setOpen,
      activeMenu,
      activeProperty,
      setActiveMenu,
      setActiveProperty: updateProperty,
      menuGroups: data || [],
    }),
    [open, activeMenu, activeProperty, data]
  );

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
};
