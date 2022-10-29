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
  unit: SelectOptionType;
  contact: SelectOptionType;
  parentTenancyId: SelectOptionType;
  residentStatus: string;
  familyStatus: string;
  checkedIn: Date | null;
  checkedOut: Date | null;
}

export interface IFormError {
  unit: string;
  contact: string;
  residentStatus: string;
  familyStatus: string;
  checkedIn: string;
  checkedOut: string;
}


interface IFormTenantProps {
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

const residentStatusOptions: SelectOptionType[] = [
  {
    label: 'Pending',
    value: 'Pending',
  },
  {
    label: 'Verified',
    value: 'Verified',
  },
  {
    label: 'Rejected',
    value: 'Rejected',
  },
];

const familyStatusOptions: SelectOptionType[] = [
  {
    label: "Houseband",
    value: "Houseband"
  },
  {
    label: "Spouse",
    value: "Spouse"
  },
  {
    label: "Child",
    value: "Child"
  },
  {
    label: "Family",
    value: "Family"
  },
  {
    label: "Assistant",
    value: "Assistant"
  }
]

const FormTenant: React.FC<IFormTenantProps> = ({
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
      title={edit ? 'Edit Tenant' : 'Tambah Tenant'}
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
                options={residentStatusOptions}
                value={form.residentStatus}
                label="Status Resident"
                name="residentStatus"
                placeholder="Pilih Resident"
                onChange={onSelectChange}
                error={Boolean(formError.residentStatus)}
                helperText={formError.residentStatus}
              />
            </Grid>
            <Grid item xs={12}>
              <SelectOption
                type="base-select"
                options={familyStatusOptions}
                value={form.familyStatus}
                label="Status Family"
                name="familyStatus"
                placeholder="Pilih Status Family"
                onChange={onSelectChange}
                error={Boolean(formError.familyStatus)}
                helperText={formError.familyStatus}
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

export default FormTenant;
