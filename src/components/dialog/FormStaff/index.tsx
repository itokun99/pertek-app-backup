import React from "react";
import { Grid, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

// additional
import Button from "@mui/material/Button";
import { SelectOptionType } from "@types";
import { SelectOptionChangeType } from "@components/select/SelectOption";
import BaseDialogForm from "../BaseDialogForm";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MultipleInput, {
  IMultipleInputItem,
  MultipleInputChangeType,
} from "../../input/MultipleInput";
import { IForm, IFormError } from "./FormStaff.interface";
import SelectIdentityType from "@components/select/SelectIdentityType";
import SelectProfileType from "@components/select/SelectProfileType";
import { formatCurrency } from "@utils/formatCurrency";
import SelectStatus from "./_components/SelectStatus";
import SelectPosition from "./_components/SelectPosition/SelectPosition";
import SelectCompanyDivision from "@components/select/SelectCompanyDivision";

interface IFormStaffProps {
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

const FormStaff: React.FC<IFormStaffProps> = ({
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
      title={edit ? "Edit Staff" : "Tambah Staff"}
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
              Staff Data
            </Typography>
            <Divider sx={{ mb: 3 }} />
          </Box>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={form.staff_code}
                placeholder="Masukkan Staff Kode"
                label="Staff Kode"
                name="staff_code"
                onChange={onInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Join Date"
                type="date"
                name="join_date"
                fullWidth
                onChange={onInputChange}
                value={form.join_date}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectPosition value={form.position} onChange={onSelectChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectStatus value={form.status} onChange={onSelectChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectCompanyDivision value={form.company_department_id} onChange={onSelectChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={formatCurrency(form.base_salary, "Rp")} // todo: format currency
                placeholder="Gaji"
                label="Basic Salary"
                name="base_salary"
                onChange={onInputChange}
                fullWidth
              />
            </Grid>
          </Grid>
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

export default React.memo(FormStaff);
