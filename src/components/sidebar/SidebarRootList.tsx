import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Icon from '@mui/material/Icon';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MuiListSubheader from '@mui/material/ListSubheader';
import Stack from '@mui/material/Stack';
import { alpha, Theme, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { SidebarContext } from '@provider/SidebarProvider';
import { NextRouter, useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { SidebarMenu } from '.';
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
  const { url, id, sub_menus, icon, name } = item;

  const [shouldExpand, setShouldExpand] = useState(isActive);
  const { setRootMenuId } = useContext(SidebarContext);

  const handleClick = () => {
    if (hasChildren && open) {
      setShouldExpand(!shouldExpand);
      return;
    }
    setShouldExpand(true);
    setRootMenuId(id);
    router.push(url);
  };

  const activeBgColor = alpha(theme.palette.info.light, 0.3);

  return (
    <>
      <ListItemButton
        key={id}
        onClick={handleClick}
        sx={{
          pr: open ? 1 : 2,
          minHeight: theme.spacing(6),
          my: theme.spacing(0.5),
          justifyContent: open ? 'initial' : 'center',
          ...(isActive && {
            backgroundColor: activeBgColor,
            color: theme.palette.info.dark,
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
            <Typography variant='body2'>{name}</Typography>
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
                <KeyboardArrowRight
                  sx={{
                    display: 'block',
                    fontSize: '1.4rem',
                    stroke: isActive ? activeBgColor : 'white',
                    strokeWidth: 0.7,
                  }}
                />
              </Box>
            )}
          </Stack>
        )}
      </ListItemButton>
      {hasChildren && (
        <Collapse in={shouldExpand && open} unmountOnExit>
          <SidebarSubList parentId={id} menus={sub_menus || []} />
        </Collapse>
      )}
    </>
  );
};

const ListSubheader = ({ title, open }: ListSubHeaderProps) => {
  const theme = useTheme();
  return (
    <MuiListSubheader
      sx={{
        opacity: open ? 1 : 0,
        textTransform: 'uppercase',
        fontSize: '0.8rem',
        color: theme.palette.text.primary,
      }}
    >
      {title}
    </MuiListSubheader>
  );
};

export const SidebarRootList = ({ menuGroup }: SidebarRootListProps) => {
  const { open, rootMenuId } = useContext(SidebarContext);
  const router = useRouter();
  const theme = useTheme();

  return (
    <div>
      <List>
        <ListSubheader title={menuGroup.name} open={open} />
      </List>
      {menuGroup.menus.map((item, key) => {
        const hasChildren = item.sub_menus && item.sub_menus.length > 0;

        const isActive = rootMenuId === item.id;

        const params = {
          theme,
          item,
          open,
          router,
          isActive,
          hasChildren,
          iconSpacing: open ? 0 : 2,
        };

        return <RootListItem {...params} key={key} />;
      })}
    </div>
  );
};
