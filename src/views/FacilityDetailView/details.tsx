import { DialogContainer } from "@components/dialog/DialogContainer";
import { Grid, Stack, Typography, useTheme } from "@mui/material";
import { IFacility } from "@types";
import { fGetTime } from "@utils/formatTime";
import BookingView from "@views/BookingView";
import { addSeconds, formatDuration, intervalToDuration } from "date-fns";
import Image from "next/image";

export interface DetailViewFacilityProps {
  facility?: IFacility | null;
}

export const DetailViewFacility = ({ facility }: DetailViewFacilityProps) => {
  const theme = useTheme();

  const now = new Date();
  const maxOrderGapDate = addSeconds(now, (facility?.max_order_gap ?? 0) * 60);
  const minOrderGapDate = addSeconds(now, (facility?.min_order_gap ?? 0) * 60);

  const maxOrderDurationDate = addSeconds(now, (facility?.max_order_duration ?? 0) * 60);
  const minOrderDurationDate = addSeconds(now, (facility?.min_order_duration ?? 0) * 60);

  const minOrderDuration = formatDuration(
    intervalToDuration({ start: now, end: minOrderDurationDate })
  );
  const maxOrderDuration = formatDuration(
    intervalToDuration({ start: now, end: maxOrderDurationDate })
  );

  const minOrderGap = formatDuration(intervalToDuration({ start: now, end: minOrderGapDate }));
  const maxOrderGap = formatDuration(intervalToDuration({ start: now, end: maxOrderGapDate }));

  return (
    <Grid container>
      <Grid item xs={12} mx={2}>
        <Grid container spacing={3} flex={1}>
          <Grid item xs={12} md={3}>
            <Image
              style={{
                borderRadius: 16,
                ...(facility?.pictures.length === 0 && {
                  backgroundColor: theme.palette.grey[300],
                }),
              }}
              width="100%"
              height="100%"
              src={facility?.pictures[0] ?? "/static/images/no-photo.png"}
              alt={facility?.name}
              layout="responsive"
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">{facility?.category.name}</Typography>
                <Typography variant="h5">{facility?.name}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" spacing={2}>
                  <Stack direction="column" spacing={2} mr={2}>
                    <Typography variant="subtitle1">Kode Fasilitas</Typography>
                    <Typography variant="subtitle1">Harga Sewa</Typography>
                    <Typography variant="subtitle1">Status</Typography>
                    <Typography variant="subtitle1">Jam Operasional Standar</Typography>
                    <Typography variant="subtitle1">Durasi Order</Typography>
                    <Typography variant="subtitle1">Jarak Booking</Typography>
                  </Stack>
                  <Stack direction="column" spacing={2}>
                    <Typography variant="body1">{facility?.code}</Typography>
                    <Typography variant="body1">
                      {facility?.price === 0 ? "Gratis" : `Rp. ${facility?.price}`}
                    </Typography>
                    <Typography variant="body1">{facility?.status}</Typography>
                    <Typography variant="body1">
                      {/* {fGetTime(facility?.open_hour!)} - {fGetTime(facility?.close_hour!)} */}
                    </Typography>
                    <Typography variant="body1">
                      {minOrderDuration} - {maxOrderDuration}
                    </Typography>
                    <Typography variant="body1">
                      {minOrderGap} - {maxOrderGap}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {facility && (
        <Grid item xs={12} mt={5} mx={2}>
          <Stack spacing={2}>
            <Typography variant="h5">Daftar Booking</Typography>
            <Grid item xs={12}>
              <BookingView />
            </Grid>
          </Stack>
        </Grid>
      )}
    </Grid>
  );
};
