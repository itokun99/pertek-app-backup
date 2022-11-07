import React from "react";
import { Grid, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

// additional
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { SelectOptionType } from "@types";
import SelectPropertyUnit from "@components/select/SelectPropertyUnit";
import SelectContact from "@components/select/SelectContact";
import SelectParentTenancy from "@components/select/SelectParentTenancy";
import { SelectOptionChangeType } from "@components/select/SelectOption";
import SelectResidentStatus from "@components/select/SelectResidentStatus";
import SelectFamilyStatus from "@components/select/SelectFamilyStatus";
import BaseDialogForm from "../BaseDialogForm";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MultipleInput, {
  IMultipleInputItem,
  MultipleInputChangeType,
} from "../../input/MultipleInput";
import { IForm, IFormError } from "./FormTenant.interface";
import SelectIdentityType from "@components/select/SelectIdentityType";
import SelectProfileType from "@components/select/SelectProfileType";
import SelectTenancyRole from "@components/select/SelectTenancyRole";

interface IFormTenantProps {
  edit: boolean;
  visible: boolean;
  form: IForm;
  loading: boolean;
  formError: IFormError;
  onClose: () => void;
  onSubmit: () => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: SelectOptionChangeType<SelectOptionType | string>;
  onMultipleInputDelete: (name: string, data: IMultipleInputItem) => Promise<void>;
  onMultipleInputSave: (name: string, data: IMultipleInputItem) => Promise<void>;
  onMultipleInputChange: MultipleInputChangeType;
}

const FormTenant: React.FC<IFormTenantProps> = ({
  edit,
  visible,
  onClose,
  onInputChange,
  onSelectChange,
  onSubmit,
  form,
  formError,
  loading,
  onMultipleInputChange,
  onMultipleInputDelete,
  onMultipleInputSave,
}) => {
  const isSAveButtonDisabled = form.emails.length === 0 || form.phones.length === 0;
  return (
    <BaseDialogForm
      fullScreen
      visible={visible}
      title={edit ? "Edit Tenant" : "Tambah Tenant"}
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
            disabled={isSAveButtonDisabled}
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
              <Grid item xs={12} sm={6}>
                <TextField
                  value={form.firstName}
                  placeholder="Masukan nama depan"
                  label="Nama Depan"
                  name="firstName"
                  onChange={onInputChange}
                  fullWidth
                  error={Boolean(formError.firstName)}
                  helperText={formError.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={form.lastName}
                  placeholder="Masukan nama belakang"
                  label="Nama Belakang"
                  name="lastName"
                  onChange={onInputChange}
                  fullWidth
                  error={Boolean(formError.lastName)}
                  helperText={formError.lastName}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <SelectProfileType
                  value={form.profileType}
                  onChange={onSelectChange}
                  error={Boolean(formError.profileType)}
                  helperText={formError.profileType}
                />
              </Grid>
              <Grid container item xs={12} spacing={2}>
                <Grid item xs={4}>
                  <SelectIdentityType
                    value={form.identityType}
                    onChange={onSelectChange}
                    error={Boolean(formError.identityType)}
                    helperText={formError.identityType}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    value={form.identity}
                    placeholder="Masukan Nomor Identitas"
                    label="Nomor Identitas"
                    name="identity"
                    onChange={onInputChange}
                    fullWidth
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    error={Boolean(formError.identity)}
                    helperText={formError.identity}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={form.npwp}
                    placeholder="Masukan Nomor NPWP"
                    label="Nomor NPWP"
                    name="npwp"
                    onChange={onInputChange}
                    fullWidth
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    error={Boolean(formError.npwp)}
                    helperText={formError.npwp}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  minRows={2}
                  value={form.address}
                  multiline
                  placeholder="Masukan alamat lengkap"
                  label="Alamat"
                  name="address"
                  onChange={onInputChange}
                  fullWidth
                  error={Boolean(formError.address)}
                  helperText={formError.address}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Properti Data
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Grid container direction="row" spacing={2}>
              <Grid item xs={12} sm={6}>
                <SelectPropertyUnit
                  value={form.propertyUnit}
                  onChange={onSelectChange}
                  error={Boolean(formError.propertyUnit)}
                  helperText={formError.propertyUnit}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectParentTenancy
                  value={form.parentTenancy}
                  unitId={form.propertyUnit?.value}
                  onChange={onSelectChange}
                  error={Boolean(formError.parentTenancy)}
                  helperText={formError.parentTenancy}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <SelectTenancyRole
                  value={form.tenancy_role}
                  onChange={onSelectChange}
                  error={Boolean(formError.tenancy_role)}
                  helperText={formError.tenancy_role}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <SelectResidentStatus
                  value={form.residentStatus} // if the parent tenancy is selected, the resident status will be verified
                  onChange={onSelectChange}
                  error={Boolean(formError.residentStatus)}
                  helperText={formError.residentStatus}
                  disabled={Boolean(form.parentTenancy)} // if parent tenancy is selected, disable this field
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <SelectFamilyStatus
                  value={form.familyStatus}
                  onChange={onSelectChange}
                  error={Boolean(formError.familyStatus)}
                  helperText={formError.familyStatus}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Check In"
                  type="date"
                  name="checkIn"
                  fullWidth
                  onChange={onInputChange}
                  value={form.checkIn}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Check Out"
                  type="date"
                  name="checkOut"
                  fullWidth
                  value={form.checkOut}
                  onChange={onInputChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} md={12}>
          <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Kontak Data
            </Typography>
            <Divider sx={{ mb: 3 }} />
            {/* content */}
            <Grid container direction="row" spacing={2}>
              <Grid item xs={12} md={6}>
                <MultipleInput
                  type="email"
                  onChange={onMultipleInputChange}
                  values={form.emails}
                  label="Email"
                  name="emails"
                  withCheckbox
                  onDelete={onMultipleInputDelete}
                  onSave={onMultipleInputSave}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <MultipleInput
                  type="text"
                  onChange={onMultipleInputChange}
                  values={form.phones}
                  label="Nomor Telepon"
                  name="phones"
                  onDelete={onMultipleInputDelete}
                  onSave={onMultipleInputSave}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </BaseDialogForm>
  );
};

export default React.memo(FormTenant);
