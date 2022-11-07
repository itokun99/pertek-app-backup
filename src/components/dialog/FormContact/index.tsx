import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

// additional
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { SelectOptionType } from "@types";
import SelectOption, { SelectOptionChangeType } from "../../select/SelectOption";
import SelectRole from "../../select/SelectRole";
import SelectProperty from "../../select/SelectProperty";
import MultipleInput, {
  IMultipleInputItem,
  MultipleInputChangeType,
} from "../../input/MultipleInput";
import Divider from "@mui/material/Divider";
import BaseDialogForm from "../BaseDialogForm";
import SelectRoleGroup from "@components/select/SelectRoleGroup";
import SelectIdentityType from "@components/select/SelectIdentityType";
import SelectProfileType from "@components/select/SelectProfileType";

export interface IForm {
  id: number;
  firstName: string;
  lastName: string;
  identity: string;
  identityType: string;
  npwp: string;
  address: string;
  profileType: string;
  role: SelectOptionType;
  roleGroup: SelectOptionType;
  property: SelectOptionType;
  emails: IMultipleInputItem[];
  phones: IMultipleInputItem[];
}

export interface IFormError {
  firstName: string;
  lastName: string;
  identity: string;
  identityType: string;
  address: string;
  profileType: string;
  npwp: string;
  property: string;
}

interface IFormContactProps {
  edit: boolean;
  visible: boolean;
  form: IForm;
  formError: IFormError;
  loading: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: SelectOptionChangeType<SelectOptionType | string>;
  onMultipleInputDelete: (name: string, data: IMultipleInputItem) => Promise<void>;
  onMultipleInputSave: (name: string, data: IMultipleInputItem) => Promise<void>;
  onMultipleInputChange: MultipleInputChangeType;
}

const identityTypeOptions: SelectOptionType[] = [
  {
    label: "KTP",
    value: "KTP",
  },
  {
    label: "SIM",
    value: "SIM",
  },
  {
    label: "Paspor",
    value: "Paspor",
  },
];

const profileTypeOptions: SelectOptionType[] = [
  {
    label: "Personal",
    value: "personal",
  },
  {
    label: "Bisnis",
    value: "bisnis",
  },
  {
    label: "Lainnya",
    value: "lainnnya",
  },
];

const FormContact: React.FC<IFormContactProps> = ({
  edit,
  visible,
  onClose,
  onInputChange,
  onSelectChange,
  onSubmit,
  loading,
  form,
  formError,
  onMultipleInputChange,
  onMultipleInputDelete,
  onMultipleInputSave,
}) => {
  return (
    <BaseDialogForm
      fullScreen
      visible={visible}
      title={edit ? "Edit Kontak" : "Tambah Kontak"}
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
      <Stack>
        <Grid container spacing={3}>
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
                Akses
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Grid container direction="row" spacing={2}>
                <Grid item xs={12}>
                  <SelectProfileType
                    value={form.profileType}
                    onChange={onSelectChange}
                    error={Boolean(formError.profileType)}
                    helperText={formError.profileType}
                  />
                </Grid>
                <Grid item xs={12}>
                  <SelectRole onChange={onSelectChange} value={form.role} />
                </Grid>
                <Grid item xs={12} pb={3}>
                  <SelectRoleGroup onChange={onSelectChange} value={form.roleGroup} />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Grid container mt={4}>
          <Grid item xs={12}>
            <Box>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Kontak
              </Typography>
              <Divider sx={{ mb: 3 }} />
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={12}>
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
              </Grid>
            </Box>
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
        <Grid container mt={4}>
          <Grid item xs={12}>
            <Box>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Properti Info
              </Typography>
              <Divider sx={{ mb: 3 }} />
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction="column" spacing={1}>
            <Box>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={12}>
                  <SelectProperty
                    onChange={onSelectChange}
                    value={form.property}
                    error={Boolean(formError.property)}
                    helperText={formError.property}
                  />
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Grid>
      </Stack>
    </BaseDialogForm>
  );
};

export default FormContact;
