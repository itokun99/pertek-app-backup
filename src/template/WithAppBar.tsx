import styled from '@emotion/styled';
import { Inbox, Mail } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Container,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
  Toolbar,
  Typography,
} from '@mui/material';
import { PropsWithChildren, ReactPropTypes } from 'react';
import useSWR from 'swr';
import { AppBarComponent } from '../components/AppBar';
import { Sidebar, SidebarMenuGroup } from '../components/Sidebar';

const MainWrapper = styled(Container)(({ theme }: { theme?: Theme }) => ({
  marginTop: theme?.spacing(10),
}));

const WithAppBar = ({ children }: PropsWithChildren) => {
  const { data } = useSWR('/api/menu');
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBarComponent />
      <Sidebar menuGroups={data} />
      <MainWrapper>{children}</MainWrapper>
    </Box>
  );
};
export default WithAppBar;
