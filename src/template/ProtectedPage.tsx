import { Box, Container, Theme, styled } from '@mui/material';
import dynamic from 'next/dynamic';
import { PropsWithChildren, Suspense } from 'react';
import { AppBarComponent } from '../components/appbar/AppBar';
// import { Sidebar } from '../components/sidebar';
import { NotificationProvider } from '../provider/NotificationProvider';
import { SidebarProvider } from '../provider/SidebarProvider';

const MainWrapper = styled(Container)(({ theme }: { theme?: Theme }) => ({
  marginTop: theme?.spacing(10),
}));

const Sidebar = dynamic(() => import('../components/sidebar/index'), {
  ssr: false,
  suspense: true,
});

const ProtectedPage = ({ children }: PropsWithChildren) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <NotificationProvider>
        <AppBarComponent />
        <SidebarProvider>
          <Suspense>
            <Sidebar />
          </Suspense>
        </SidebarProvider>
        <MainWrapper maxWidth='xl'>{children}</MainWrapper>
      </NotificationProvider>
    </Box>
  );
};
export default ProtectedPage;
