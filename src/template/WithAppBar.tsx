import { Box, Container, Theme, styled } from '@mui/material';
import { PropsWithChildren } from 'react';
import { AppBarComponent } from '../components/appbar/AppBar';
import { Sidebar } from '../components/sidebar';
import { NotificationProvider } from '../provider/NotificationProvider';
import { SidebarProvider } from '../provider/SidebarProvider';

const MainWrapper = styled(Container)(({ theme }: { theme?: Theme }) => ({
  marginTop: theme?.spacing(10),
}));

const WithAppBar = ({ children }: PropsWithChildren) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <NotificationProvider>
        <AppBarComponent />
        <SidebarProvider>
          <Sidebar />
        </SidebarProvider>
        <MainWrapper maxWidth='xl'>{children}</MainWrapper>
      </NotificationProvider>
    </Box>
  );
};
export default WithAppBar;
