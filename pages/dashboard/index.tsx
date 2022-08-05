import { Box, Button, Container, Grid, Icon, Paper, Typography } from '@mui/material';
import { getCookies } from 'cookies-next';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { AppBarComponent } from '../../src/components/AppBar';
import { AuthContext } from '../../src/context/AuthContext';

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

export default function Dashboard({ isLoggedIn }: any) {
  const { changeState } = useContext(AuthContext);

  useEffect(() => {
    changeState(isLoggedIn);
  }, [isLoggedIn, changeState]);

  return (
    <>
      <AppBarComponent />
      <Container maxWidth='md'>
        <Grid container spacing={0}>
          {menus.map((menu: any) => (
            <Grid item xs={3} sm={3} md={2} key={menu.name}>
              <Button href={menu.href} sx={{ padding: 0 }}>
                <Paper elevation={0} sx={{ width: 120, height: 120, borderRadius: 2 }} square>
                  <Typography variant='h6' align='center'>
                    <Icon>{menu.icon}</Icon>
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
