import { KeyboardArrowRight } from '@mui/icons-material';
import {
  List,
  ListItemButton,
  ListSubheader as MuiListSubheader,
  useTheme,
  alpha,
  ListItemIcon,
  Icon,
  Stack,
  ListItemText,
  Box,
  Collapse,
} from '@mui/material';
import { useContext, useEffect, useMemo, useState } from 'react';
import { SidebarMenu } from '.';
import { SidebarContext } from '../../provider/SidebarProvider';
import { SidebarMenuGroup } from './Sidebar';
import { SidebarSubList } from './SidebarSubList';

export interface SidebarRootListProps {
  menuGroup: SidebarMenuGroup;
}

interface ListSubHeaderProps {
  title: string;
  color?: string;
  open?: boolean;
}

const RootListItem = ({ url, id, submenus, icon, name }: SidebarMenu) => {
  const { setActiveMenuId, activeParentMenuId, activeChildMenuId, open } = useContext(SidebarContext);
  const theme = useTheme();

  const rootMenuItemId = useMemo(() => `${url}-${id}`, [url, id]);
  const iconSpacing = open ? 0 : 2;
  const hasChildren = submenus && submenus.length > 0;

  const isActive = activeParentMenuId === rootMenuItemId && activeChildMenuId !== '';
  const [shouldExpand, setShouldExpand] = useState(false);

  const handleClick = () => {
    setShouldExpand(!shouldExpand);
    setActiveMenuId(rootMenuItemId, 'parent');
  };

  return (
    <>
      <ListItemButton
        key={rootMenuItemId}
        onClick={handleClick}
        sx={{
          minHeight: theme.spacing(6),
          justifyContent: open ? 'initial' : 'center',
          ...(isActive && {
            backgroundColor: alpha(theme.palette.primary.light, 0.3),
            color: theme.palette.primary.dark,
          }),
        }}
      >
        <ListItemIcon sx={{ ml: theme.spacing(iconSpacing) }}>
          <Icon>{icon}</Icon>
        </ListItemIcon>

        {open && (
          <Stack
            direction='row'
            sx={{
              flexGrow: 1,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <ListItemText>{name}</ListItemText>
            {hasChildren && (
              <Box
                sx={{
                  transition: (theme) =>
                    theme.transitions.create('transform', {
                      duration: theme.transitions.duration.shorter,
                    }),
                  ...(shouldExpand && {
                    transform: 'rotate(90deg)',
                  }),
                }}
              >
                <KeyboardArrowRight style={{ display: 'block' }} />
              </Box>
            )}
          </Stack>
        )}
      </ListItemButton>
      {hasChildren && (
        <Collapse in={shouldExpand} unmountOnExit>
          <SidebarSubList menus={submenus} />
        </Collapse>
      )}
    </>
  );
};

const ListSubheader = ({ title, color, open }: ListSubHeaderProps) => (
  <MuiListSubheader
    sx={{
      opacity: open ? 1 : 0,
      textTransform: 'uppercase',
      fontSize: '0.85rem',
      color: color,
    }}
  >
    {title}
  </MuiListSubheader>
);

export const SidebarRootList = ({ menuGroup }: SidebarRootListProps) => {
  const { open } = useContext(SidebarContext);

  return (
    <List>
      <ListSubheader title={menuGroup.name} open={open} />
      {menuGroup.menus.map((item, key) => (
        <RootListItem key={key} {...item} />
      ))}
    </List>
  );
};
