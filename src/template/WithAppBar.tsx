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
import { AppBarComponent } from '../components/AppBar';
import { Sidebar } from '../components/sidebar';
import { SidebarProvider } from '../provider/SidebarProvider';

const MainWrapper = styled(Container)(({ theme }: { theme?: Theme }) => ({
  marginTop: theme?.spacing(10),
}));

const WithAppBar = ({ children }: PropsWithChildren) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBarComponent />
      <SidebarProvider>
        <Sidebar />
      </SidebarProvider>
      <MainWrapper>{children}</MainWrapper>
    </Box>
  );
};
export default WithAppBar;
