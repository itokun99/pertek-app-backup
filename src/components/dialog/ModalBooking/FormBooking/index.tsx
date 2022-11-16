import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import { Grid, TextField } from '@mui/material';
import React from 'react';

// additional
import BaseDialogForm from '@components/dialog/BaseDialogForm';
import { SelectOptionChangeType } from '@components/select/SelectOption';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { SelectOptionType } from '@types';

import SelectStatusBooking from '../_components/SelectStatusBooking';
import { IForm } from './FormBooking.interface';

interface IFormBookingProps {
  visible: boolean;
  form: IForm;
  loading: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: SelectOptionChangeType<SelectOptionType | string>;
}

const FormBooking: React.FC<IFormBookingProps> = ({
  visible,
  onClose,
  onInputChange,
  onSelectChange,
  onSubmit,
  form,
  loading,
}) => {
  return (
    <BaseDialogForm
      fullScreen
      visible={visible}
      title='Buat Booking Facility'
      onClose={onClose}
      action={
        <>
          <Button variant='outlined' color='error' onClick={onClose}>
            Cancel
          </Button>
          <LoadingButton
            color='primary'
            onClick={onSubmit}
            loading={loading}
            loadingPosition='start'
            startIcon={<SaveIcon />}
            variant='contained'
          >
            Simpan
          </LoadingButton>
        </>
      }
    >
      <Grid container direction='row' spacing={2}>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant='h6' sx={{ mb: 1 }}>
              Personal Data
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Grid container direction='row' spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Slot Date'
                  type='date'
                  name='slot_date'
                  fullWidth
                  onChange={onInputChange}
                  value={form.slot_date}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectStatusBooking value={form.status} onChange={onSelectChange} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Open Hours'
                  name='open_hour'
                  type='time'
                  onChange={onInputChange}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  // error={Boolean(formError.firstName)}
                  // helperText=""
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Close Hours'
                  name='close_hour'
                  type='time'
                  onChange={onInputChange}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  // error={Boolean(formError.firstName)}
                  // helperText=""
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  value={form.description}
                  placeholder='Masukan Deskripsi'
                  label='Deskripsi'
                  name='description'
                  onChange={onInputChange}
                  fullWidth
                  minRows={3}
                  multiline
                  // error={Boolean(formError.firstName)}
                  // helperText=""
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </BaseDialogForm>
  );
};

export default React.memo(FormBooking);
