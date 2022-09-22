import { Box, Container, Theme, styled } from '@mui/material';
import dynamic from 'next/dynamic';
import { PropsWithChildren, Suspense } from 'react';
import SimpleBar from 'simplebar-react';
import { NotificationProvider } from '../provider/NotificationProvider';
import { SidebarProvider } from '../provider/SidebarProvider';

const MainWrapper = styled(Container)(({ theme }: { theme?: Theme }) => ({
  marginTop: theme?.spacing(10),
}));

const DyanmicSidebar = dynamic(() => import('../components/sidebar/index'), {
  suspense: true,
  ssr: false,
});

const DynamicAppBar = dynamic(() => import('../components/appbar/AppBar'), {
  ssr: false,
  suspense: true,
});

const ProtectedPage = ({ children }: PropsWithChildren) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <NotificationProvider>
        <Suspense>
          <DynamicAppBar />
        </Suspense>
        <SidebarProvider>
          <Suspense>
            <DyanmicSidebar />
          </Suspense>
          <SimpleBar style={{ height: '100vh', width: '100vw', overflowX: 'hidden' }}>
            <MainWrapper maxWidth='xl'>{children}</MainWrapper>
          </SimpleBar>
        </SidebarProvider>
      </NotificationProvider>
    </Box>
  );
};
export default ProtectedPage;
