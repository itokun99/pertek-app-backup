import { Box, Button, Container, Fab, Grid, Icon, IconButton, Paper, Typography } from '@mui/material';
import { getCookies } from 'cookies-next';
import { useContext, useEffect } from 'react';
import { AppBarComponent } from '../../src/components/AppBar';
import { AuthContext } from '../../src/context/AuthContext';
import WithAppBar from '../../src/template/WithAppBar';

export const getServerSideProps = async (context: any) => {
  const cookies = getCookies(context);
  return {
    props: {
      isLoggedIn: cookies.token === 'admin',
    },
  };
};

const menus = [
  {
    name: 'Dashboard',
    icon: 'dashboard',
    href: '/dashboard',
  },
  {
    name: 'Property',
    icon: 'home',
    href: '/property',
  },
  {
    name: 'Tenant',
    icon: 'person',
    href: '/tenant',
  },
  {
    name: 'Payment',
    icon: 'attach_money',
    href: '/payment',
  },
  {
    name: 'Report',
    icon: 'assessment',
    href: '/report',
  },
  {
    name: 'Setting',
    icon: 'settings',
    href: '/setting',
  },
];

function Dashboard({ isLoggedIn }: any) {
  const { changeState } = useContext(AuthContext);

  useEffect(() => {
    changeState(isLoggedIn);
  }, [isLoggedIn, changeState]);

  return (
    <>
      <Fab color='primary'>
        <Icon>apps</Icon>
      </Fab>
      <Container maxWidth='md' sx={{ height: 1000 }}>
        <Grid container spacing={3}>
          {menus.map((menu: any) => (
            <Grid item xs={3} sm={2} md={2} key={menu.name}>
              <Button href={menu.href} sx={{ padding: 0, width: 150, height: 150 }}>
                <Paper elevation={0} sx={{ width: 130, height: 130, borderRadius: 2 }} square>
                  <Typography variant='h6' align='center'>
                    <Icon
                      sx={{
                        fontSize: '120px',
                      }}
                    >
                      {menu.icon}
                    </Icon>
                  </Typography>
                </Paper>
              </Button>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

Dashboard.getLayout = (page: any) => <WithAppBar>{page}</WithAppBar>;

export default Dashboard;
