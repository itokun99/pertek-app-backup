import { Drawer as MuiDrawer, styled, useTheme } from '@mui/material';
import { Component, ComponentProps, PropsWithChildren, useContext } from 'react';
import { SidebarContext, SidebarContextInterface } from '../../provider/SidebarProvider';
import { Drawer } from './Drawer';
import { SidebarContent } from './SidebarContent';
import { SidebarHeader } from './SidebarHeader';

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
      <SidebarHeader title='propertek' buttonColor={theme.palette.primary.dark} />
      <SidebarContent />
    </Drawer>
  );
};
