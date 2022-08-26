import { createContext, PropsWithChildren, useMemo, useState } from 'react';
import useSWR from 'swr';
import { SidebarMenuGroup } from '../components/sidebar';

export interface SidebarContextInterface {
  menuGroups: SidebarMenuGroup[];
  activeParentMenuId: string;
  activeChildMenuId: string;
  open: boolean;
  setOpen: (state: boolean) => void;
  setActiveMenuId: (id: string, type: 'parent' | 'child') => void;
}

const initialContext: SidebarContextInterface = {
  menuGroups: [],
  activeParentMenuId: '',
  activeChildMenuId: '',
  open: true,
  setOpen: (_) => null,
  setActiveMenuId: (id, type) => null,
};
export const SidebarContext = createContext<SidebarContextInterface>(initialContext);

export const SidebarProvider = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(true);
  const [activeChildMenuId, setActiveChildMenuId] = useState('');
  const [activeParentMenuId, setActiveParentMenuId] = useState('');
  const { data } = useSWR('/api/menu');

  const setActiveMenuId = (id: string, type: 'parent' | 'child') =>
    type === 'parent' ? setActiveParentMenuId(id) : setActiveChildMenuId(id);

  const value = useMemo<SidebarContextInterface>(
    () => ({
      open,
      setOpen,
      activeChildMenuId,
      activeParentMenuId,
      setActiveMenuId,
      menuGroups: data || [],
    }),
    [open, activeChildMenuId, activeParentMenuId, data]
  );

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
};
