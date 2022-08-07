import styled from '@emotion/styled';
import { Box, Container } from '@mui/material';
import { AppBarComponent } from '../components/AppBar';

const MainWrapper = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(3),
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
