import React from "react";
import { Grid, TextField } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

// additional
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { SelectOptionType } from "@types";
import SelectPropertyUnit from "@components/select/SelectPropertyUnit";
import SelectContact from "@components/select/SelectContact";
import SelectParentTenancy from "@components/select/SelectParentTenancy";
import { SelectOptionChangeType } from '@components/select/SelectOption';
import SelectResidentStatus from "@components/select/SelectResidentStatus";
import SelectFamilyStatus from "@components/select/SelectFamilyStatus";
import BaseDialogForm from '../BaseDialogForm';

export interface IForm {
  id: number;
  propertyUnit: SelectOptionType;
  contact: SelectOptionType;
  parentTenancy: string;
  residentStatus: string;
  familyStatus: string;
  checkIn: Date | null;
  checkOut: Date | null;
}

export interface IFormError {
  propertyUnit: string;
  contact: string;
  residentStatus: string;
  familyStatus: string;
  checkIn: string;
  checkOut: string;
  parentTenancy: string;
}

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
  loading
}) => {
  return (
    <BaseDialogForm
      visible={visible}
      title={edit ? 'Edit Tenant' : 'Tambah Tenant'}
      onClose={onClose}
      action={(
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
      )}>
      <Stack direction="column" spacing={3}>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={12}>
            <SelectPropertyUnit
              value={form.propertyUnit}
              onChange={onSelectChange}
              error={Boolean(formError.propertyUnit)}
              helperText={formError.propertyUnit}
            />
          </Grid>
          <Grid item xs={12}>
            <SelectParentTenancy
              value={form.parentTenancy}
              unitId={Number(form.propertyUnit.value)}
              onChange={onSelectChange}
              error={Boolean(formError.propertyUnit)}
              helperText={formError.parentTenancy}
            />
          </Grid>
          <Grid item xs={12}>
            <SelectContact
              value={form.contact}
              onChange={onSelectChange}
              error={Boolean(formError.contact)}
              helperText={formError.contact}
            />
          </Grid>
          <Grid item xs={12}>
            <SelectResidentStatus
              value={form.residentStatus}
              onChange={onSelectChange}
              error={Boolean(formError.residentStatus)}
              helperText={formError.residentStatus}
            />
          </Grid>
          <Grid item xs={12}>
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
      </Stack>
    </BaseDialogForm>
  );
};

export default React.memo(FormTenant);
