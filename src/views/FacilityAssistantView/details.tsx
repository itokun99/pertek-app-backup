import { DialogContainer } from '@components/dialog/DialogContainer';
import { Grid, Stack, Typography } from '@mui/material';
import { IFacilityAssistant } from '@types';
import { BookingTableView } from '@views/BookingView/TableView';
import Image from 'next/image';

export interface DetailViewFacilityAssistantProps {
  assistant?: IFacilityAssistant | null;
  onClose: () => void;
}

export const DetailViewFacilityAssistant = ({ assistant, onClose }: DetailViewFacilityAssistantProps) => {
  return (
    <DialogContainer closeButtonAction={onClose} fullScreen open={!!assistant}>
      <Grid container>
        <Grid item xs={12} mx={2}>
          <Grid container spacing={3} flex={1}>
            <Grid item xs={12} md={3}>
              <Image
                style={{ borderRadius: 16 }}
                width='100%'
                height='100%'
                src={
                  assistant?.profile.profile_picture !== ''
                    ? assistant?.profile.profile_picture!
                    : '/static/images/no-photo.png'
                }
                alt={assistant?.profile.first_name}
                layout='responsive'
              />
            </Grid>
            <Grid item xs={12} md={9}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant='subtitle1'></Typography>
                  <Typography variant='h5'></Typography>
                </Grid>
                <Grid item xs={12}>
                  <Stack direction='row' spacing={2}>
                    <Stack direction='column' spacing={2} mr={2}>
                      <Typography variant='subtitle1'>Kode Fasilitas</Typography>
                      <Typography variant='subtitle1'>Harga Sewa</Typography>
                      <Typography variant='subtitle1'>Status</Typography>
                      <Typography variant='subtitle1'>Jam Operasional Standar</Typography>
                      <Typography variant='subtitle1'>Durasi Order</Typography>
                      <Typography variant='subtitle1'>Jarak Booking</Typography>
                    </Stack>
                    <Stack direction='column' spacing={2}>
                      <Typography variant='body1'></Typography>
                      <Typography variant='body1'></Typography>
                      <Typography variant='body1'></Typography>
                      <Typography variant='body1'></Typography>
                      <Typography variant='body1'></Typography>
                      <Typography variant='body1'></Typography>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} mt={5} mx={2}>
          <Stack spacing={2}>
            <Typography variant='h5'>Daftar Booking</Typography>
            <Grid item xs={12}>
              <BookingTableView />
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </DialogContainer>
  );
};
