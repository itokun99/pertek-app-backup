import React from "react";
import { Grid, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

// additional
import Button from "@mui/material/Button";
import { SelectOptionType } from "@types";
import { SelectOptionChangeType } from "@components/select/SelectOption";
import BaseDialogForm from "@components/dialog/BaseDialogForm";
import Box from "@mui/material/Box";

import { IForm } from "./FormBooking.interface";
import SelectStatusBooking from "../_components/SelectStatusBooking";
import { formatCurrency } from "@utils/formatCurrency";
import SelectFacility from "../_components/SelectFacility";
import SelectBookingSlot from "../_components/SelectBookingSlot";
import SelectTenant from "@components/select/SelectTenant";
import SelectUnitByContactID from "../_components/SelectUnitByContactId";

interface IFormBookingProps {
  visible: boolean;
  form: IForm;
  loading: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: SelectOptionChangeType<SelectOptionType | string>;
  onCustomSelect: (event: any, value: any, name: string) => void;
}

const FormBooking: React.FC<IFormBookingProps> = ({
  visible,
  onClose,
  onInputChange,
  onSelectChange,
  onCustomSelect,
  onSubmit,
  form,
  loading,
}) => {
  return (
    <BaseDialogForm
      visible={visible}
      title="Form Pemesanan Fasilitas"
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
        <Grid item xs={12} md={12}>
          <Box>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={12} sm={6}>
                <SelectTenant value={form.tenant} onChange={onSelectChange} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectUnitByContactID
                  value={form.propertyUnit}
                  onChange={onSelectChange}
                  contactId={String(form.tenant?.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <SelectFacility
                  value={form.facility}
                  onChange={(event: React.SyntheticEvent, value: any) =>
                    onCustomSelect(event, value, "facility")
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectBookingSlot
                  data={form.facility !== null ? form.facility?.value.booking_slots : []}
                  value={form.bookingSlot}
                  onChange={(event: React.SyntheticEvent, value: any) =>
                    onCustomSelect(event, value, "bookingSlot")
                  }
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
                  InputProps={{ inputProps: { min: new Date().toISOString().split("T")[0] } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectStatusBooking value={form.status} onChange={onSelectChange} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={formatCurrency(String(form.facility?.value.price), "Rp")} // todo: format currency
                  placeholder="harga"
                  label="Price"
                  name="price"
                  disabled
                  onChange={onInputChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
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
                  InputLabelProps={{ shrink: true }}
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
