import {
  Drawer as MuiDrawer,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  styled,
  Box,
  IconButton,
  useTheme,
  DrawerProps,
  CSSObject,
  Theme,
  Typography,
  ListSubheader,
  Icon,
  Stack,
  alpha,
  Collapse,
  ListItemButtonProps,
} from '@mui/material';
import {
  FiberManualRecord,
  KeyboardArrowRight,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from '@mui/icons-material';
import { createRef, forwardRef, ReactElement, RefObject, useState } from 'react';
import { NextRouter, useRouter } from 'next/router';

interface MyDrawerProps extends DrawerProps {
  width?: number;
}

interface RootGroupItemProp extends ListItemButtonProps {
  onClick: () => any;
  icon: string;
  name: string;
  shouldBeStyled?: boolean;
  shouldBeAnimated?: boolean;
  open?: boolean;
  children?: ReactElement | false;
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

export interface SidebarMenuGroup {
  id: number;
  name: string;
  menus: SidebarMenu[];
}

export interface SidebarProps {
  width?: number;
  menuGroups?: SidebarMenuGroup[];
}

const openedMixin = (theme: Theme): CSSObject => ({
  width: 280,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })<MyDrawerProps>(
  ({ theme, open }) => ({
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': {
        ...openedMixin(theme),
        borderRight: `1px dashed ${theme.palette.grey[300]}`,
      },
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': {
        ...closedMixin(theme),
        borderRight: `1px dashed ${theme.palette.grey[300]}`,
      },
    }),
  })
);

const StyledDrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const DrawerHeader = ({ open, onClick }: { open: boolean; onClick: () => any }) => {
  const theme = useTheme();
  const buttonSx = { color: theme.palette.primary.dark };
  const icon = open ? <KeyboardDoubleArrowLeft sx={buttonSx} /> : <KeyboardDoubleArrowRight sx={buttonSx} />;
  return (
    <StyledDrawerHeader>
      {open && (
        <Box flexGrow={1} sx={{ pl: theme.spacing(2) }}>
          <Typography variant='subtitle1'>PROPERTEK</Typography>
        </Box>
      )}
      <IconButton onClick={onClick}>{icon}</IconButton>
    </StyledDrawerHeader>
  );
};

const createUniqueId = (menu: SidebarMenu) => `${menu.url}/${menu.id}`;

const currentButtonIsClicked = (currentId: string, clickedButtonId: string) => currentId === clickedButtonId;

const hasSubMenu = (menu: SidebarMenu) => menu.submenus && menu.submenus.length > 0;

const shouldBeStyled = (pathname: string, url: string) => pathname === url;
/*
export const SidebarOld = ({ menuGroups }: SidebarProps) => {
  const [open, setOpen] = useState(true);
  const [clickedButtonId, setClickedButtonId] = useState('');
  const theme = useTheme();
  const router = useRouter();

  const rootMenuRefs = {} as {
    [key: string]: RefObject<any>;
  };

  const handleClicked = (id: string) => {
    let newId = id === clickedButtonId ? '' : id;
    setClickedButtonId(newId);
    if (newId !== '') {
      console.log(rootMenuRefs[id]);
    }
  };

  return (
    <Drawer variant='permanent' open={open}>
      <DrawerHeader onClick={() => setOpen(!open)} open={open} />
      <Box sx={{ px: open ? theme.spacing(2) : theme.spacing(1), color: theme.palette.text.secondary }}>
        {menuGroups?.map(({ name, id, menus }) => {
          const rootListKey = `${name}/${id}`;

          return (
            <List key={rootListKey} disablePadding sx={{ display: 'block', mb: theme.spacing(2) }}>
              <ListSubheader
                sx={{
                  opacity: open ? 1 : 0,
                  textTransform: 'uppercase',
                  fontSize: '0.85rem',
                  color: theme.palette.text.primary,
                }}
              >
                {name}
              </ListSubheader>
              {menus.map((menu) => {
                const uniqueButtonId = createUniqueId(menu);
                const styledState = shouldBeStyled(router.pathname, menu.url);
                const animatedState = currentButtonIsClicked(uniqueButtonId, clickedButtonId);

                rootMenuRefs[uniqueButtonId] = createRef();

                return (
                  <RootGroupItem
                    ref={rootMenuRefs[uniqueButtonId]}
                    key={uniqueButtonId}
                    open={open}
                    icon={menu.icon}
                    name={menu.name}
                    shouldBeStyled={styledState}
                    shouldBeAnimated={animatedState}
                    onClick={() => handleClicked(uniqueButtonId)}
                  >
                    {hasSubMenu(menu) && (
                      <Collapse
                        in={hasSubMenu(menu) && currentButtonIsClicked(clickedButtonId, uniqueButtonId) && open}
                        unmountOnExit
                      >
                        <SubMenuList menus={menu.submenus!} />
                      </Collapse>
                    )}
                  </RootGroupItem>
                );
              })}
            </List>
          );
        })}
      </Box>
    </Drawer>
  );
};

const SubMenuList = ({ menus }: { menus: SidebarSubMenu[] }) => {
  const router = useRouter();
  const theme = useTheme();
  return (
    <List>
      {menus.map((menu, key) => {
        const shouldbeStyled = shouldBeStyled(router.pathname, menu.url);
        return (
          <ListItemButton key={key}>
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

const RootGroupItem = forwardRef(({
  icon,
  name,
  onClick,
  open,
  shouldBeStyled,
  shouldBeAnimated,
  children,
}: RootGroupItemProp, ref) => {
  const theme = useTheme();
  return (
    <>
      <ListItemButton
        ref={ref}
        onClick={onClick}
        sx={{
          minHeight: theme.spacing(6),
          justifyContent: open ? 'initial' : 'center',
          ...(shouldBeStyled && {
            backgroundColor: alpha(theme.palette.primary.light, 0.3),
            color: theme.palette.primary.dark,
          }),
        }}
      >
        <ListItemIcon
          sx={{
            ml: open ? theme.spacing(0) : theme.spacing(2),
          }}
        >
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
            {children && (
              <Box
                sx={{
                  transition: (theme) =>
                    theme.transitions.create('transform', {
                      duration: theme.transitions.duration.shorter,
                    }),
                  ...(shouldBeAnimated && {
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
      {children}
    </>
  );
};
*/
