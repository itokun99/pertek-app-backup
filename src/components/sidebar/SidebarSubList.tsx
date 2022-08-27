import { FiberManualRecord } from '@mui/icons-material';
import { List, ListItemButton, ListItemIcon, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { SidebarSubMenu } from '.';
import { SidebarContext } from '../../provider/SidebarProvider';

export interface SidebarSubListProps {
  parentId: string;
  menus: SidebarSubMenu[];
}

export const SidebarSubList = ({ menus, parentId }: SidebarSubListProps) => {
  const theme = useTheme();
  const router = useRouter();
  const { setActiveMenu, activeMenu, setHasActiveChild } = useContext(SidebarContext);

  const handleClick = (parentId: string, childId: string, url: string) => {
    setActiveMenu({ parentId, childId });
    router.push(url);
  };

  return (
    <List>
      {menus.map((menu, key) => {
        const childId = `${menu.url}-${menu.id}`;
        const isActive = router.pathname === menu.url;
        return (
          <ListItemButton key={key} onClick={() => handleClick(parentId, childId, menu.url)}>
            <ListItemIcon>
              <FiberManualRecord
                sx={{
                  ml: 1,
                  fontSize: '10px',
                  ...(isActive && { color: theme.palette.primary.dark }),
                }}
              />
            </ListItemIcon>
            <Typography
              variant='body1'
              sx={{
                ...(isActive && {
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                }),
              }}
            >
              {menu.name}
            </Typography>
          </ListItemButton>
        );
      })}
    </List>
  );
};
