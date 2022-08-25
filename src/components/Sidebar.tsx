import {
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  styled,
  Box,
  Grid,
  IconButton,
  useTheme,
  DrawerProps,
  CSSObject,
  Theme,
  Typography,
  ListSubheader,
  Container,
  Icon,
  Stack,
  alpha,
  Collapse,
  MenuItem,
} from '@mui/material';
import {
  ArrowBackIos,
  ChevronLeft,
  ChevronRight,
  FiberManualRecord,
  FiberManualRecordOutlined,
  Inbox,
  KeyboardArrowRight,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
  Mail,
} from '@mui/icons-material';
import {
  FunctionComponent,
  MouseEventHandler,
  PropsWithChildren,
  ReactElement,
  ReactHTMLElement,
  ReactPropTypes,
  useEffect,
  useState,
} from 'react';
import useSWR from 'swr';
import { NextRouter, useRouter } from 'next/router';
import { ReactJSXElementAttributesProperty } from '@emotion/react/types/jsx-namespace';

interface MyDrawerProps extends DrawerProps {
  width?: number;
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

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

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

const createUniqueId = (menu: SidebarMenu) => `${menu.url}/${menu.id}`;

const currentButtonIsClicked = (currentId: string, clickedButtonId: string) => currentId === clickedButtonId;

const hasSubMenu = (menu: SidebarMenu) => menu.submenus && menu.submenus.length > 0;

const shouldBeStyled = (pathname: string, url: string) => pathname === url;

export const Sidebar = ({ menuGroups }: SidebarProps) => {
  const [open, setOpen] = useState(true);
  const [clickedButtonId, setClickedButtonId] = useState('');
  const theme = useTheme();
  const router = useRouter();

  const handleClicked = (id: string) => {
    let newId = id === clickedButtonId ? '' : id;
    setClickedButtonId(newId);
  };

  return (
    <Drawer variant='permanent' open={open}>
      <DrawerHeader>
        {open && (
          <Box
            flexGrow={1}
            sx={{
              pl: theme.spacing(2),
            }}
          >
            <Typography variant='subtitle1'>PROPERTEK</Typography>
          </Box>
        )}
        <IconButton onClick={() => setOpen(!open)}>
          {!open ? (
            <KeyboardDoubleArrowRight
              sx={{
                color: theme.palette.primary.dark,
              }}
            />
          ) : (
            <KeyboardDoubleArrowLeft
              sx={{
                color: theme.palette.primary.dark,
              }}
            />
          )}
        </IconButton>
      </DrawerHeader>
      <Box sx={{ px: open ? theme.spacing(2) : theme.spacing(1), color: theme.palette.text.secondary }}>
        {menuGroups?.map((group, rootKey) => {
          return (
            <List key={`${group.name}/${rootKey}`} disablePadding sx={{ display: 'block', mb: theme.spacing(2) }}>
              <ListSubheader
                sx={{
                  opacity: open ? 1 : 0,
                  textTransform: 'uppercase',
                  fontSize: '0.85rem',
                  color: theme.palette.text.primary,
                }}
              >
                {group.name}
              </ListSubheader>
              {group.menus.map((menu) => {
                const uniqueButtonId = createUniqueId(menu);
                let meShouldBeStyled = false;

                return (
                  <RootGroupItem
                    key={uniqueButtonId}
                    open={open}
                    {...menu}
                    shouldBeStyled={shouldBeStyled(router.pathname, menu.url) || meShouldBeStyled}
                    shouldBeAnimated={currentButtonIsClicked(uniqueButtonId, clickedButtonId)}
                    onClick={() => handleClicked(uniqueButtonId)}
                  >
                    {menu.submenus && menu.submenus.length > 0 && (
                      <Collapse
                        in={hasSubMenu(menu) && currentButtonIsClicked(clickedButtonId, uniqueButtonId) && open}
                        unmountOnExit
                      >
                        <SubMenuList menus={menu.submenus} />
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

interface RootGroupItemProp extends SidebarMenu {
  onClick: () => any;
  shouldBeStyled?: boolean;
  shouldBeAnimated?: boolean;
  open?: boolean;
  children?: ReactElement | false;
}

const RootGroupItem = ({
  icon,
  name,
  onClick,
  open,
  shouldBeStyled,
  shouldBeAnimated,
  children,
}: RootGroupItemProp) => {
  const theme = useTheme();
  return (
    <>
      <ListItemButton
        onClick={onClick}
        sx={{
          minHeight: theme.spacing(6),
          justifyContent: open ? 'initial' : 'center',
          borderRadius: theme.spacing(1),
          fontSize: '0.95rem',
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
                <KeyboardArrowRight />
              </Box>
            )}
          </Stack>
        )}
      </ListItemButton>
      {children}
    </>
  );
};

/*
{menuGroups?.map((group, parentKey) => (
  <List key={parentKey} disablePadding sx={{ display: 'block' }}>
    {group.menus.map((menu, key) => (
      <>
      <ListItemButton
          onClick={() => handleClicked(`${menu.url}/${menu.id}`)}
          sx={{
            minHeight: theme.spacing(6),
            justifyContent: open ? 'initial' : 'center',
            borderRadius: theme.spacing(1),
            fontSize: '0.95rem',
            ...(shouldBeStyledAndAnimated(router, menu, clickedButtonId, true) && {
              backgroundColor: alpha(theme.palette.primary.light, 0.3),
              color: theme.palette.primary.dark,
            }),
          }}
        >
           <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            {menu.icon && <Icon>{menu.icon}</Icon>}
          </ListItemIcon>
           { open && (
            <Stack
              direction='row'
              sx={{
                flexGrow: 1,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            > 
           <Box sx={{ flex: 1, display: 'block' }}>{menu.name}</Box>
           {open && haveSubMenu(menu) && (
                 <Box
                  sx={{
                    transition: (theme) =>
                      theme.transitions.create('transform', {
                        duration: theme.transitions.duration.shorter,
                      }),
                    ...(shouldBeStyledAndAnimated(router, menu, clickedButtonId, true) && {
                      transform: 'rotate(90deg)',
                    }),
                  }}
                >
                  <KeyboardArrowRight fontSize='small' />
                </Box>
               )}
          </Stack>
           )}
       </ListItemButton>
       */
