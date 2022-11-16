import React from "react";
import { Grid, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

// additional
import Button from "@mui/material/Button";
import { SelectOptionType } from "@types";
import { SelectOptionChangeType } from "@components/select/SelectOption";
import BaseDialogForm from "@components/dialog/BaseDialogForm";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import { IForm } from "./FormBooking.interface";
import SelectIdentityType from "@components/select/SelectIdentityType";
import SelectProfileType from "@components/select/SelectProfileType";
import SelectStatusBooking from "../_components/SelectStatusBooking";
import { formatCurrency } from "@utils/formatCurrency";
import SelectFacility from "../_components/SelectFacility";
import SelectBookingSlot from "../_components/SelectBookingSlot";

interface IFormBookingProps {
  visible: boolean;
  form: IForm;
  loading: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: SelectOptionChangeType<SelectOptionType | string>;
  onSelectFacility: (event: any, value: any) => void;
  onSelectBookingSlot: (event: any, value: any) => void;
}

const FormBooking: React.FC<IFormBookingProps> = ({
  visible,
  onClose,
  onInputChange,
  onSelectChange,
  onSelectFacility,
  onSelectBookingSlot,
  onSubmit,
  form,
  loading,
}) => {
  return (
    <BaseDialogForm
      fullScreen
      visible={visible}
      title="Buat Booking Facility"
      onClose={onClose}
      action={
        <>
          <Button variant="outlined" color="error" onClick={onClose}>
            Cancel
          </Button>
          <LoadingButton
            color="primary"
            onClick={onSubmit}
            loading={loading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
          >
            Simpan
          </LoadingButton>
        </>
      }
    >
      <Grid container direction="row" spacing={2}>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Personal Data
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Grid container direction="row" spacing={2}>
              <Grid item xs={12} sm={12}>
                <SelectFacility value={form.facility} onChange={onSelectFacility} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectBookingSlot
                  data={form.facility !== null ? form.facility?.value.booking_slots : []}
                  value={form.bookingSlot}
                  onChange={onSelectBookingSlot}
                  disabled={form.facility === null}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Slot Date"
                  type="date"
                  name="slot_date"
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
                  value={formatCurrency(form.price, "Rp")} // todo: format currency
                  placeholder="harga"
                  label="Price"
                  name="price"
                  onChange={onInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  value={form.description}
                  placeholder="Masukan Deskripsi"
                  label="Deskripsi"
                  name="description"
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
