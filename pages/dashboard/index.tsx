import { Box, Button, Container, Fab, Grid, Icon, Paper, Typography } from '@mui/material';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { withSessionSsr } from '../../lib/withSession';
import { AuthContext } from '../../src/provider/AuthProvider';
import ProtectedPage from '../../src/template/ProtectedPage';

function Dashboard() {
  return (
    <Container maxWidth='md' sx={{ height: 1000 }}>
      <Grid container spacing={3}></Grid>
    </Container>
  );
}

Dashboard.getLayout = (page: any) => <ProtectedPage>{page}</ProtectedPage>;

export default Dashboard;
