import TaskAltOutlined from '@mui/icons-material/TaskAltOutlined';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { useTheme } from '@mui/material/styles';

import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { doFetch } from '@lib/dataFetcher';
import { AlertContext } from '@provider/AlertProvider';
import { NetworkContext, NetworkState } from '@provider/NetworkProvider';
import { Property, SidebarContext } from '@provider/SidebarProvider';
import { ErrorComponent } from '../../components/error/ErrorComponent';

const PropertyView = () => {
  const theme = useTheme();
  const { isReady, asPath } = useRouter();

  const { setAlert } = useContext(AlertContext);
  const { isOnline, isOffline } = useContext(NetworkContext);
  const { activeProperty, setActiveProperty } = useContext(SidebarContext);

  const [data, setData] = useState<any>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (isReady) {
      doFetch(asPath, setData, setAlert, setIsError);
      // (async () => {
      //   const { error, data } = await fetchData('/api/');
      //   if (error) {
      //     setAlert({
      //       severity: 'error',
      //       message: error,
      //     });
      //     return;
      //   }
      //   setProperties(data!.items);
      // })();
    }
  }, [setAlert, asPath, isReady]);

  const handleReload = (e: any) => {
    e.preventDefault();
    doFetch(asPath, setData, setAlert, setIsError, true);
  };

  if (!data) {
    return (
      <Grid item md={4} sm={12}>
        <Card>Tidak ada data</Card>
      </Grid>
    );
  }

  if (isOffline || (isOnline && isError)) {
    return (
      <Grid item md={4} sm={12}>
        <Card>
          <ErrorComponent showReloadButton={isError} offline={isOffline} onReload={handleReload} />
        </Card>
      </Grid>
    );
  }

  if (isOnline && !isError && !data) {
    return (
      <Grid item md={4} sm={12}>
        <Card>
          <Skeleton width='100%' height='100%' />
        </Card>
      </Grid>
    );
  }

  return (
    <>
      {data.items.map((property: Property, key: number) => {
        const isActive = activeProperty?.id === property.id;
        const gradient = theme.palette.gradients.primary;
        const contrastText = theme.palette.info.contrastText;
        const lightText = theme.palette.info.light;
        const primaryText = theme.palette.text.primary;
        const secondaryText = theme.palette.text.secondary;

        return (
          <Grid key={key} item md={4} sm={12}>
            <Card>
              <CardActionArea
                sx={{
                  backgroundImage: isActive ? gradient : 'none',
                }}
                onClick={() => setActiveProperty(property)}
              >
                <Box p={3}>
                  <Stack direction='row'>
                    <Box flex={1} justifyContent='space-between'>
                      <Typography variant='subtitle1' color={isActive ? contrastText : undefined}>
                        {property.name}
                      </Typography>
                      <Typography variant='body2' color={isActive ? contrastText : secondaryText}>
                        {property.address}
                      </Typography>
                    </Box>
                    {isActive && (
                      <Box>
                        <TaskAltOutlined sx={{ color: isActive ? lightText : contrastText }} />
                      </Box>
                    )}
                  </Stack>
                  <Stack direction='row' gap={4} mt={2}>
                    <Stack>
                      <Typography variant='body2' color={isActive ? lightText : secondaryText}>
                        {property.type.match(/apartment|office*|mall/i) ? 'Tower' : 'Klaster'}
                      </Typography>
                      <Typography variant='h4' color={isActive ? lightText : primaryText}>
                        {property.total_cluster}
                      </Typography>
                    </Stack>
                    <Stack>
                      <Typography variant='body2' color={isActive ? lightText : secondaryText}>
                        Unit
                      </Typography>
                      <Typography variant='h4' color={isActive ? lightText : primaryText}>
                        {property.total_unit}
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
                {/* <Box position='relative' bottom={0} left={16} sx={{ zIndex: 10 }}>
                  <Typography variant='h3'>Apartment</Typography>
                </Box> */}
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </>
  );
};

export default PropertyView;
