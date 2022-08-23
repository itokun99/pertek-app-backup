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
import { AppBarComponent } from '../components/AppBar';
import { Sidebar } from '../components/Sidebar';

const MainWrapper = styled(Container)(({ theme }: { theme?: Theme }) => ({
  marginTop: theme?.spacing(10),
}));

const WithAppBar = (props: any) => {
  const { children } = props;
  return (
    <Box display='flex'>
      <AppBarComponent />
      <Sidebar />
      <MainWrapper>{children}</MainWrapper>
    </Box>
  );
};
export default WithAppBar;
