import { createContext, PropsWithChildren, useMemo, useState } from 'react';
import useSWR from 'swr';
import { SidebarMenuGroup } from '../components/sidebar';

export interface SidebarContextInterface {
  menuGroups: SidebarMenuGroup[];
  activeMenu: {
    parentId?: string;
    childId?: string;
  };
  open: boolean;
  setOpen: (state: boolean) => void;
  setActiveMenu: (data: { parentId: string; childId: string }) => void;
}

export const SidebarContext = createContext<SidebarContextInterface>({
  menuGroups: [],
  activeMenu: {
    parentId: '',
    childId: '',
  },
  open: true,
  setOpen: (_) => null,
  setActiveMenu: (_) => {},
});

export const SidebarProvider = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState({
    parentId: '',
    childId: '',
  });

  const { data } = useSWR('/api/menu');
  // const data = [];

  const value = useMemo<SidebarContextInterface>(
    () => ({
      open,
      setOpen,
      activeMenu,
      setActiveMenu,
      menuGroups: data || [],
    }),
    [open, activeMenu, data]
  );

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
};
