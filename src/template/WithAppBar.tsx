import styled from '@emotion/styled';
import { Box, Container, Theme } from '@mui/material';
import { AppBarComponent } from '../components/AppBar';

const MainWrapper = styled(Container)(({ theme }: { theme?: Theme }) => ({
  marginTop: theme?.spacing(3),
}));

const WithAppBar = (props: any) => {
  const { children } = props;
  return (
    <>
      <AppBarComponent />
      <MainWrapper maxWidth='xl'>{children}</MainWrapper>
    </>
  );
};
export default WithAppBar;
