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
import SelectFacilityCategory from "../ModalFacility/_components/SelectFacilityCategory";
import SelectStaff from "./_components/SelectStaff";

export type IForm = {
  id: string;
  staff: SelectOptionType | null;
  category: SelectOptionType | null;
};

interface IFormFacilityAsistenProps {
  edit: boolean;
  visible: boolean;
  form: IForm;
  loading: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: SelectOptionChangeType<SelectOptionType | string>;
}

const FormFacilityAsisten: React.FC<IFormFacilityAsistenProps> = ({
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
      title={edit ? "Form Edit Facility Asisten" : "Form Tambah Facility Asisten"}
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
              <Grid item xs={12} sm={12}>
                <SelectFacilityCategory onChange={onSelectChange} value={form.category} />
              </Grid>
              <Grid item xs={12} sm={12}>
                <SelectStaff onChange={onSelectChange} value={form.staff} />
              </Grid>
              {/* end */}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </BaseDialogForm>
  );
};

export default React.memo(FormFacilityAsisten);
