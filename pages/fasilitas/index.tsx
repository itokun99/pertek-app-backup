import { Add } from '@mui/icons-material';
import { Card, Grid, Stack, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { ReactElement, Suspense, SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { AnimatedButton } from '../../src/components/AnimatedButtton';
import { TabBar, TabItem } from '../../src/components/TabBar';
import ProtectedPage from '../../src/template/ProtectedPage';

const TableFacilityReservation = dynamic(() => import('../../src/components/fasilitas/FacilityBookingList'), {
  ssr: false,
  suspense: true,
});

const statusColorMap = {
  All: 'default',
  Requested: 'info',
  Booked: 'warning',
  Ongoing: 'success',
  'No Show': 'error',
  Canceled: 'error',
  Done: 'default',
} as { [key: string]: string };

const Fasilitas = () => {
  const theme = useTheme();
  const router = useRouter();

  const tabObjects: TabItem[] = [];

  const [tabIndex, setTabIndex] = useState(0);
  const [stats, setStats] = useState<Array<{ status: string; count: number }> | undefined>();

  useEffect(() => {
    if (router.isReady) {
      const index = parseInt(router.query.tab as string);
      if (!isNaN(index) && index !== 0) {
        setTabIndex(index);
      }
    }
  }, [router]);

  const tabs = useMemo<TabItem[]>(() => {
    if (!stats) {
      const keys = Object.keys(statusColorMap);
      keys.forEach((key) =>
        tabObjects.push({
          color: statusColorMap[key] as any,
          text: key,
        })
      );

      return tabObjects;
    }

    let totalCount = 0;

    stats.forEach((stat) => {
      totalCount += stat.count;

      tabObjects.push({
        color: statusColorMap[stat.status.toString()] as any,
        label: stat.count as any,
        text: stat.status,
      });
    });

    tabObjects.unshift({
      color: 'default',
      text: 'All',
      label: totalCount as any,
    });

    return tabObjects;
  }, [stats]);

  useEffect(() => {
    (async () => {
      const statsResponse = await fetch('/api/fasilitas/stats');
      if (statsResponse.ok) {
        const payload = await statsResponse.json();
        setStats(payload);
      }
    })();
  }, []);

  const handleTabClick = (_: SyntheticEvent<Element, Event>, index: number) => {
    setTabIndex(index);
  };

  useEffect(() => {
    if (router.isReady) {
      if (tabIndex === 0) {
        delete router.query.tab;
        delete router.query.status;
      } else {
        router.query.status = tabs[tabIndex].text;
        router.query.tab = tabIndex.toString();
      }
      router.push({
        pathname: router.pathname,
        query: router.query,
      });
    }
  }, [tabIndex]);

  const handleNewBooking = () => {};

  return (
    <Stack mt={12}>
      <Box mb={5}>
        <Grid container>
          <Grid item flexGrow={1}>
            <Stack>
              <Typography variant='h6'>Booking Management</Typography>
              <Typography variant='body2' color={theme.palette.text.secondary}>
                Kelola reservasi fasilitas properti Anda
              </Typography>
            </Stack>
          </Grid>
          <Grid item>
            <Stack direction='row' gap={2}>
              <AnimatedButton onClick={handleNewBooking} color='info' startIcon={<Add />}>
                Booking Baru
              </AnimatedButton>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <Card>
        <TabBar theme={theme} value={tabIndex} onChange={handleTabClick} tabs={tabs} />
        <Stack direction='row'></Stack>
        <Suspense>
          <Box mx={2}>
            <TableFacilityReservation />
          </Box>
        </Suspense>
      </Card>
    </Stack>
  );
};

Fasilitas.getLayout = (page: ReactElement) => <ProtectedPage>{page}</ProtectedPage>;

export default Fasilitas;
