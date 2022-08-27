import { createContext, PropsWithChildren, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import { SidebarMenuGroup } from '../components/sidebar';

export interface SidebarContextInterface {
  menuGroups: SidebarMenuGroup[];
  activeMenu: {
    parentId?: string;
    childId?: string;
  };
  hasActiveChild: boolean;
  open: boolean;
  setOpen: (state: boolean) => void;
  setHasActiveChild: (hasActive: boolean) => void;
  setActiveMenu: (data: { parentId: string; childId: string }) => void;
}

export const SidebarContext = createContext<SidebarContextInterface>({
  menuGroups: [],
  activeMenu: {
    parentId: '',
    childId: '',
  },
  hasActiveChild: false,
  open: true,
  setOpen: (_) => null,
  setHasActiveChild: (_) => null,
  setActiveMenu: (_) => {},
});

export const SidebarProvider = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(true);
  const [hasActiveChild, setHasActiveChild] = useState(false);
  const [activeMenu, setActiveMenu] = useState({
    parentId: '',
    childId: '',
  });
  const { data } = useSWR('/api/menu');

  const value = useMemo<SidebarContextInterface>(
    () => ({
      open,
      setOpen,
      activeMenu,
      setActiveMenu,
      hasActiveChild,
      setHasActiveChild,
      menuGroups: data || [],
    }),
    [open, activeMenu, hasActiveChild, data]
  );

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
};
