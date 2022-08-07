import { Add } from '@mui/icons-material';
import { Box, Button, Card, Container, Grid, IconButton, Paper, Stack, styled, Typography } from '@mui/material';
import { ReactElement } from 'react';
import WithAppBar from '../../src/template/WithAppBar';

const TableWrapper = styled(Paper)(({ theme }) => ({}));

const TenantPage = () => {
  return (
    <Stack>
      <Box>
        <Grid container>
          <Grid sx={{ flexGrow: 1 }}>
            <Stack>
              <Typography variant='h6'>Tenant Management</Typography>
              <Typography variant='body2'>Kelola tenant properti</Typography>
            </Stack>
          </Grid>
          <Grid>
            <Button startIcon={<Add />} variant='contained'>
              Tambah Tenant
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <TableWrapper>hello</TableWrapper>
      </Box>
    </Stack>
  );
};

TenantPage.getLayout = (page: ReactElement) => <WithAppBar>{page}</WithAppBar>;

export default TenantPage;
