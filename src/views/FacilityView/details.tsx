import { DialogContainer } from '@components/dialog/DialogContainer';
import { Avatar, Grid, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { IFacility } from '@types';
import { fGetTime } from '@utils/formatTime';
import { addSeconds, formatDistance, formatDistanceToNow, formatDuration, intervalToDuration } from 'date-fns';
import Image from 'next/image';

export interface DetailViewFacilityProps {
  facility?: IFacility | null;
  onClose: () => void;
}

export const DetailViewFacility = ({ facility, onClose }: DetailViewFacilityProps) => {
  const now = new Date();
  const maxOrderGapDate = addSeconds(now, (facility?.max_order_gap ?? 0) * 60);
  const minOrderGapDate = addSeconds(now, (facility?.min_order_gap ?? 0) * 60);

  const maxOrderDurationDate = addSeconds(now, (facility?.max_order_duration ?? 0) * 60);
  const minOrderDurationDate = addSeconds(now, (facility?.min_order_duration ?? 0) * 60);

  const minOrderDuration = formatDuration(intervalToDuration({ start: now, end: minOrderDurationDate }));
  const maxOrderDuration = formatDuration(intervalToDuration({ start: now, end: maxOrderDurationDate }));

  const minOrderGap = formatDuration(intervalToDuration({ start: now, end: minOrderGapDate }));
  const maxOrderGap = formatDuration(intervalToDuration({ start: now, end: maxOrderGapDate }));

  return (
    <DialogContainer closeButtonAction={onClose} fullScreen open={!!facility}>
      <Grid container>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Avatar sx={{ width: '100%', height: 230 }} variant='rounded'>
                <Image
                  src={facility?.pictures[0] ?? '/static/images/product_3.jpg'}
                  alt={facility?.name}
                  layout='fill'
                  width={250}
                  height='100%'
                />
              </Avatar>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant='h5'>{facility?.name}</Typography>
              <Typography variant='subtitle1'>{facility?.category.name}</Typography>
              <Box mt={5}>
                <Stack direction='row' spacing={2}>
                  <Typography variant='h6'>{facility?.code}</Typography>
                  <Typography variant='h6'>{facility?.price === 0 ? 'Gratis' : `Rp. ${facility?.price}`}</Typography>
                </Stack>
                <Stack direction='row' spacing={2} flexGrow={1}>
                  <Typography variant='subtitle1'>Status</Typography>
                  <Typography variant='body1'>{facility?.status}</Typography>
                </Stack>
                <Stack direction='row' spacing={2} flexGrow={1}>
                  <Typography variant='subtitle1'>Jam Operasional Standar</Typography>
                  <Typography variant='body1'>
                    {fGetTime(facility?.default_open_hour!)} - {fGetTime(facility?.default_close_hour!)}
                  </Typography>
                </Stack>
                <Stack direction='row' spacing={2} flexGrow={1}>
                  <Typography variant='subtitle1'>Durasi Order</Typography>
                  <Typography variant='body1'>
                    {minOrderDuration}
                    {' - '}
                    {maxOrderDuration}
                  </Typography>
                </Stack>
                <Stack direction='row' spacing={2} flexGrow={1}>
                  <Typography variant='subtitle1'>Jarak Booking</Typography>
                  <Typography variant='body1'>
                    {minOrderGap}
                    {' - '}
                    {maxOrderGap}
                  </Typography>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} mt={5}>
          <Stack direction='column' spacing={2}>
            <Typography variant='h5'>Daftar Booking</Typography>
            booking table goes here
          </Stack>
        </Grid>
      </Grid>
    </DialogContainer>
  );
};
