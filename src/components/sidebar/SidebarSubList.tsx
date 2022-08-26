import { FiberManualRecord } from '@mui/icons-material';
import { List, ListItemButton, ListItemIcon, Typography, useTheme } from '@mui/material';
import { useContext } from 'react';
import { SidebarSubMenu } from '.';
import { SidebarContext } from '../../provider/SidebarProvider';

export interface SidebarSubListProps {
  menus: SidebarSubMenu[];
}

export const SidebarSubList = ({ menus }: SidebarSubListProps) => {
  const theme = useTheme();
  const { setActiveMenu, activeMenu } = useContext(SidebarContext);

  return (
    <List>
      {menus.map((menu, key) => {
        const childMenuId = `${menu.url}-${menu.id}`;
        const shouldbeStyled = activeMenu.childId === childMenuId;
        return (
          <ListItemButton key={key} onClick={() => setActiveMenu({ childId: childMenuId })}>
            <ListItemIcon>
              <FiberManualRecord
                sx={{
                  ml: 1,
                  fontSize: '10px',
                  ...(shouldbeStyled && { color: theme.palette.primary.dark }),
                }}
              />
            </ListItemIcon>
            <Typography
              variant='body1'
              sx={{
                ...(shouldbeStyled && {
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
