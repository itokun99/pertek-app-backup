import React from "react";
import { Grid, TextField } from "@mui/material";

// additional
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";


import { SelectOptionType } from "@types";
import SelectOption, { SelectOptionChangeType } from '../../select/SelectOption';
import SelectRole from '../../select/SelectRole';
import SelectProperty from '../../select/SelectProperty';
import MultipleInput, { IMultipleInputItem, MultipleInputChangeType } from '../../input/MultipleInput';
import Divider from '@mui/material/Divider';
import BaseDialogForm from '../BaseDialogForm';
import SelectRoleGroup from "@components/select/SelectRoleGroup";

export interface IForm {
  id: number;
  firstName: string;
  lastName: string;
  identity: string;
  identityType: string;
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
}


interface IFormContactProps {
  edit: boolean;
  visible: boolean;
  form: IForm;
  formError: IFormError;
  onClose: () => void;
  onSubmit: () => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: SelectOptionChangeType<SelectOptionType | string>;
  onMultipleInputChange: MultipleInputChangeType
}


const identityTypeOptions: SelectOptionType[] = [
  {
    label: "KTP",
    value: "KTP"
  },
  {
    label: "SIM",
    value: "SIM"
  },
  {
    label: "Paspor",
    value: "Paspor"
  },
]

const profileTypeOptions: SelectOptionType[] = [
  {
    label: "Personal",
    value: "personal"
  },
  {
    label: "Bisnis",
    value: "bisnis"
  },
  {
    label: "Lainnya",
    value: "lainnnya"
  },
]

const FormContact: React.FC<IFormContactProps> = ({
  edit,
  visible,
  onClose,
  onInputChange,
  onSelectChange,
  onMultipleInputChange,
  onSubmit,
  form,
  formError
}) => {
  return (
    <BaseDialogForm
      visible={visible}
      title={edit ? 'Edit Kontak' : 'Tambah Kontak'}
      onClose={onClose}
      action={(
        <>
          <Button variant="outlined" color="error" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="info" onClick={onSubmit}>
            Simpan
          </Button>
        </>
      )}>
      <Stack direction="column" spacing={3}>
        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>Personal Info</Typography>
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
            <Grid item xs={12}>
              <SelectOption
                type="base-select"
                options={identityTypeOptions}
                value={form.identityType}
                label="Tipe Identitas"
                name="identityType"
                placeholder="Pilih Identitas"
                onChange={onSelectChange}
                error={Boolean(formError.identityType)}
                helperText={formError.identityType}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={form.identity}
                placeholder="Masukan Nomor Identitas"
                label="Nomor Identitas"
                name="identity"
                onChange={onInputChange}
                fullWidth
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                error={Boolean(formError.identity)}
                helperText={formError.identity}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
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
            <Grid item xs={12}>
              <SelectOption
                type="base-select"
                options={profileTypeOptions}
                value={form.profileType}
                label="Tipe Profil"
                name="profileType"
                placeholder="Pilih Tipe Profil"
                onChange={onSelectChange}
                error={Boolean(formError.profileType)}
                helperText={formError.profileType}
              />
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>Email</Typography>
          <Divider sx={{ mb: 3 }} />
          <Grid container direction="row" spacing={2}>
            <Grid item xs={12}>
              <MultipleInput
                type="email"
                onChange={onMultipleInputChange}
                values={form.emails}
                label="Email"
                name="emails"
                withCheckbox
              />
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>Nomor Telepon</Typography>
          <Divider sx={{ mb: 3 }} />
          <Grid container direction="row" spacing={2}>
            <Grid item xs={12}>
              <MultipleInput
                type="text"
                onChange={onMultipleInputChange}
                values={form.phones}
                label="Nomor Telepon"
                name="phones"
              />
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>Properti Info</Typography>
          <Divider sx={{ mb: 3 }} />
          <Grid container direction="row" spacing={2}>
            <Grid item xs={12}>
              <SelectProperty onChange={onSelectChange} value={form.property} />
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>Akses</Typography>
          <Divider sx={{ mb: 3 }} />
          <Grid container direction="row" spacing={2}>
            <Grid item xs={12}>
              <SelectRole onChange={onSelectChange} value={form.role} />
            </Grid>
            <Grid item xs={12}>
              <SelectRoleGroup onChange={onSelectChange} value={form.roleGroup} />
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </BaseDialogForm>
  );
};

export default FormContact;
