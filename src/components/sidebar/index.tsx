import { useTheme } from '@mui/material';
import { useContext } from 'react';
import { SidebarContext } from '../../provider/SidebarProvider';
import { Drawer } from './Drawer';
import { SidebarContent } from './SidebarContent';
import { SidebarHeader } from './SidebarHeader';

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

export interface SidebarMenuGroup {
  id: number;
  name: string;
  menus: SidebarMenu[];
}

export interface SidebarSubMenu {
  id: number;
  name: string;
  url: string;
  icon?: string;
}

export interface SidebarMenu {
  id: number;
  name: string;
  url: string;
  icon: string;
  submenus?: SidebarSubMenu[];
}

export const Sidebar = () => {
  const theme = useTheme();
  const { open } = useContext(SidebarContext);

  return (
    <Drawer variant='permanent' width={280} open={open}>
      <SimpleBar style={{ maxHeight: '100vh' }}>
        <SidebarHeader buttonColor={theme.palette.primary.dark}>Propertek</SidebarHeader>
        <SidebarContent />
      </SimpleBar>
    </Drawer>
  );
};
