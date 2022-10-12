import { Add, Search } from "@mui/icons-material";
import { Card, Grid, InputAdornment, Stack, TextField, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { ReactElement, Suspense, SyntheticEvent, useEffect, useMemo, useState } from "react";
import AnimatedButton from "../../src/components/buttons/AnimatedButton";
import Label from "../../src/components/Label";
import { TabBar } from "../../src/components/TabBar";
import ProtectedPage from "../../src/template/ProtectedPage";

const TableFacilityReservation = dynamic(
  () => import("../../src/components/tables/TableFacilityReservation"),
  {
    ssr: false,
    suspense: true,
  }
);

const createLabel = (label: string) => <Label color="success">{label}</Label>;

const ReservasiFasilitas = () => {
  const theme = useTheme();
  const router = useRouter();

  const [tabIndex, setTabIndex] = useState(0);
  const tabs = useMemo(() => ["All", "Requested", "Ongoing", "No Show", "Canceled", "Done"], []);

  useEffect(() => {}, []);

  const handleTabClick = (_: SyntheticEvent<Element, Event>, index: number) => {
    if (index === 0) {
      router.push("/reservasi");
    } else {
      router.push(`${router.asPath}?`, {
        query: {
          status: encodeURI(tabs[index]),
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
              <AnimatedButton onClick={handleNewBooking} color="info" startIcon={<Add />}>
                Booking Baru
              </AnimatedButton>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <Card>
        <TabBar theme={theme} value={tabIndex} onChange={handleTabClick} tabs={tabs} />
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

ReservasiFasilitas.getLayout = (page: ReactElement) => <ProtectedPage>{page}</ProtectedPage>;

export default ReservasiFasilitas;
