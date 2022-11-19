import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import { Grid, TextField } from "@mui/material";
import React from "react";

// additional
import { SelectOptionChangeType } from "@components/select/SelectOption";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { SelectOptionType } from "@types";
import BaseDialogForm from "../BaseDialogForm";
import { IForm } from "./FormFacility.interface";
import SelectFacilityStatus from "./_components/SelectFacilityStatus";
import SelectFacilityType from "./_components/SelectFacilityType";
import { formatCurrency } from "@utils/formatCurrency";

interface IFormFacilityProps {
  edit: boolean;
  visible: boolean;
  form: IForm;
  loading: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: SelectOptionChangeType<SelectOptionType | string>;
}

const FormFacility: React.FC<IFormFacilityProps> = ({
  edit,
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
      visible={visible}
      title={edit ? "Form Edit Facility" : "Form Tambah Facility"}
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
                <TextField
                  value={form.name}
                  placeholder="Masukan nama Fasilitas"
                  label="Nama Fasilitas"
                  name="name"
                  onChange={onInputChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={form.code}
                  placeholder="Masukan code Fasilitas"
                  label="Code Fasilitas"
                  name="code"
                  onChange={onInputChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectFacilityType value={form.facility_type} onChange={onSelectChange} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={form.code}
                  placeholder="Pilih Kategori Fasilitas"
                  label="Kategori Fasilitas"
                  name="code"
                  onChange={onInputChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <SelectFacilityStatus value={form.status} onChange={onSelectChange} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Grid container direction="row" spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      value={form.open_hour}
                      type="time"
                      placeholder="Jam Buka"
                      label="Jam Buka"
                      name="open_hour"
                      onChange={onInputChange}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      value={form.close_hour}
                      type="time"
                      placeholder="Jam Tutup"
                      label="Jam Tutup"
                      name="close_hour"
                      onChange={onInputChange}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  value={formatCurrency(String(form.price), "Rp")} // todo: format currency
                  placeholder="Masukan harga Fasilitas"
                  label="Harga"
                  name="price"
                  onChange={onInputChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Grid container direction="row" spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      value={form.slot_start}
                      type="time"
                      placeholder="Slot Start"
                      label="Slot Start"
                      name="slot_start"
                      onChange={onInputChange}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      value={form.slot_end}
                      type="time"
                      placeholder="Slot End"
                      label="Slot End"
                      name="slot_end"
                      onChange={onInputChange}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Grid>
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
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Grid container direction="row" spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      value={form.slot_duration}
                      type="number"
                      placeholder="Min Slot Duration"
                      label="Min Slot Duration"
                      name="slot_duration"
                      onChange={onInputChange}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      value={form.max_capacity}
                      type="number"
                      placeholder="Max Capacity"
                      label="Max Capacity"
                      name="max_capacity"
                      onChange={onInputChange}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Grid container direction="row" spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      value={form.min_order_duration}
                      type="number"
                      placeholder="Min Order Duration"
                      label="Min Order Duration"
                      name="min_order_duration"
                      onChange={onInputChange}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      value={form.max_order_duration}
                      type="number"
                      placeholder="Max Order Duration"
                      label="Max Order Duration"
                      name="max_order_duration"
                      onChange={onInputChange}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={12}>
                <Grid container direction="row" spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      value={form.min_order_gap}
                      type="number"
                      placeholder="Min Order Gap"
                      label="Min Order Gap"
                      name="min_order_gap"
                      onChange={onInputChange}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      value={form.max_order_gap}
                      type="number"
                      placeholder="Max Order Gap"
                      label="Max Order Gap"
                      name="max_order_gap"
                      onChange={onInputChange}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      value={form.max_cancel_gap}
                      type="number"
                      placeholder="Max Cancel Gap"
                      label="Max Cancel Gap"
                      name="max_cancel_gap"
                      onChange={onInputChange}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* end */}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </BaseDialogForm>
  );
};

export default React.memo(FormFacility);
