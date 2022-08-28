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
  Theme,
} from '@mui/material';
import { NextRouter, useRouter } from 'next/router';
import { useContext, useMemo, useState } from 'react';
import { SidebarMenu } from '.';
import { SidebarContext } from '../../provider/SidebarProvider';
import { SidebarSubList } from './SidebarSubList';

export interface SidebarMenuGroup {
  id: number;
  name: string;
  menus: SidebarMenu[];
}

export interface SidebarRootListProps {
  menuGroup: SidebarMenuGroup;
}

interface ListSubHeaderProps {
  title: string;
  color?: string;
  open?: boolean;
}

export interface RootListItemProps {
  theme: Theme;
  item: SidebarMenu;
  router: NextRouter;
  open?: boolean;
  isActive?: boolean;
  hasChildren?: boolean;
  iconSpacing?: number;
}

const RootListItem = ({ item, open, theme, router, isActive, hasChildren, iconSpacing }: RootListItemProps) => {
  const { url, id, submenus, icon, name } = item;

  const parentId = useMemo(() => `${url}-${id}`, [url, id]);

  const [shouldExpand, setShouldExpand] = useState(isActive);

  const handleClick = () => {
    if (hasChildren) {
      setShouldExpand(!shouldExpand);
      return;
    }
    router.push(url);
  };

  return (
    <>
      <ListItemButton
        key={parentId}
        onClick={handleClick}
        sx={{
          minHeight: theme.spacing(6),
          my: theme.spacing(0.5),
          justifyContent: open ? 'initial' : 'center',
          ...(isActive && {
            backgroundColor: alpha(theme.palette.primary.light, 0.3),
            color: theme.palette.primary.dark,
          }),
          ...(open && {}),
        }}
      >
        <ListItemIcon sx={{ ml: theme.spacing(iconSpacing || 0) }}>
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
        <Collapse in={shouldExpand && open} unmountOnExit>
          <SidebarSubList parentId={parentId} menus={submenus || []} />
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
  const router = useRouter();
  const theme = useTheme();

  return (
    <List>
      <ListSubheader title={menuGroup.name} open={open} />
      {menuGroup.menus.map((item, key) => {
        const hasChildren = item.submenus && item.submenus.length > 0;
        const isActive = () => {
          if (hasChildren) {
            return router.pathname.split('/')[1] === item.url.split('/')[1];
          }
          return router.pathname === item.url;
        };

        const params = {
          theme,
          item,
          open,
          router,
          isActive: isActive(),
          hasChildren,
          iconSpacing: open ? 0 : 2,
        };

        return <RootListItem key={key} {...params} />;
      })}
    </List>
  );
};
