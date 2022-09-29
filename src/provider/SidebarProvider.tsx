import { createContext, PropsWithChildren, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import { SidebarMenuGroup } from '../components/sidebar';
import { useRouter } from 'next/router';

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
  const { isReady } = useRouter();

  const [open, setOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState<ActiveMenu | undefined>();
  const [activeProperty, setActiveProperty] = useState<Property | undefined>();

  useEffect(() => {
    if (isReady) {
      const activePropertyInLocalStorage = window.localStorage.getItem('activeProperty');
      if (activePropertyInLocalStorage) {
        setActiveProperty(JSON.parse(activePropertyInLocalStorage));
      }
    }
  }, [isReady]);

  const updateProperty = (property: Property) => {
    if (window) {
      window.localStorage.setItem('activeProperty', JSON.stringify(property));
    }
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
