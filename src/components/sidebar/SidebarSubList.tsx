import { FiberManualRecord } from '@mui/icons-material';
import { List, ListItem, ListItemButton, ListItemIcon, Typography, useTheme } from '@mui/material';
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
  const { setActiveMenu } = useContext(SidebarContext);

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
          <ListItem key={key}>
            <ListItemButton key={key} onClick={() => handleClick(parentId, childId, menu.url)}>
              <ListItemIcon>
                <FiberManualRecord
                  sx={{
                    ml: 0.7,
                    fontSize: '8px',
                    ...(isActive && { color: theme.palette.info.main, fontSize: '10px' }),
                  }}
                />
              </ListItemIcon>
              <Typography
                variant='body2'
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
          </ListItem>
        );
      })}
    </List>
  );
};
