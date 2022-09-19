import { Box, Button, Container, Fab, Grid, Icon, Paper, Typography } from '@mui/material';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { withSessionSsr } from '../../lib/withSession';
import { AuthContext } from '../../src/provider/AuthProvider';
import WithAppBar from '../../src/template/WithAppBar';

export const getServerSideProps = withSessionSsr(async function getServerSideProps({ req }) {
  return {
    props: {
      user: req.session.user || null,
    },
  };
});

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

function Dashboard({ user }: any) {
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.replace('/login');
    }
  }, [user, router]);

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
