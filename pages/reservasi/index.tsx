import { Add, Search } from "@mui/icons-material";
import {
  Card,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import {
  ReactElement,
  Suspense,
  SyntheticEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AnimatedButton } from "../../src/components/AnimatedButtton";
import { TabBar, TabItem } from "../../src/components/TabBar";
import ProtectedPage from "../../src/template/ProtectedPage";

const TableFacilityReservation = dynamic(
  () => import("../../src/components/tables/TableFacilityReservation"),
  {
    ssr: false,
    suspense: true,
  }
);

const ReservasiFasilitas = () => {
  const theme = useTheme();
  const router = useRouter();

  const [tabIndex, setTabIndex] = useState(0);
  const [stats, setStats] = useState<
    Array<{ status: string; count: number }> | undefined
  >();

  useEffect(() => {
    if (router.isReady) {
      const index = parseInt(router.query.tab as string);
      if (!isNaN(index) && index !== 0) {
        setTabIndex(index);
      }
    }
  }, []);

  const tabs = useMemo<TabItem[]>(() => {
    const tabobjects: TabItem[] = [];

    const statusColorMap = {
      All: "default",
      Requested: "info",
      Booked: "warning",
      Ongoing: "success",
      "No Show": "error",
      Canceled: "error",
      Done: "default",
    } as { [key: string]: string };

    if (!stats) {
      const keys = Object.keys(statusColorMap);
      keys.forEach((key) =>
        tabobjects.push({
          color: statusColorMap[key] as any,
          text: key,
        })
      );

      return tabobjects;
    }

    let totalCount = 0;

    stats.forEach((stat) => {
      totalCount += stat.count;

      tabobjects.push({
        color: statusColorMap[stat.status.toString()] as any,
        label: stat.count as any,
        text: stat.status,
      });
    });

    tabobjects.unshift({
      color: "default",
      text: "All",
      label: totalCount as any,
    });

    return tabobjects;
  }, [stats]);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/reservasi/stats");
      if (response.ok) {
        const payload = await response.json();
        setStats(payload);
      }
    })();
  }, []);

  const handleTabClick = (_: SyntheticEvent<Element, Event>, index: number) => {
    if (index === 0) {
      router.push("/reservasi");
    } else {
      router.push(`${router.asPath}?`, {
        query: {
          status: tabs[index].text,
          tab: index,
        },
      });
    }
    setTabIndex(index);
  };

  const handleNewBooking = () => {};

  return (
    <Stack mt={12}>
      <Box mb={5}>
        <Grid container>
          <Grid item flexGrow={1}>
            <Stack>
              <Typography variant="h6">Booking Management</Typography>
              <Typography variant="body2" color={theme.palette.text.secondary}>
                Kelola reservasi fasilitas properti Anda
              </Typography>
            </Stack>
          </Grid>
          <Grid item>
            <Stack direction="row" gap={2}>
              <AnimatedButton
                onClick={handleNewBooking}
                color="info"
                startIcon={<Add />}
              >
                Booking Baru
              </AnimatedButton>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <Card>
        <TabBar
          theme={theme}
          value={tabIndex}
          onChange={handleTabClick}
          tabs={tabs}
        />
        <Box m={2}>
          <TextField
            fullWidth
            placeholder="Search for booking"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Suspense>
          <TableFacilityReservation />
        </Suspense>
      </Card>
    </Stack>
  );
};

ReservasiFasilitas.getLayout = (page: ReactElement) => (
  <ProtectedPage>{page}</ProtectedPage>
);

export default ReservasiFasilitas;
