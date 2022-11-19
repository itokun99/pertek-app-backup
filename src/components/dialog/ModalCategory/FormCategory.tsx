import React from "react";
import { Grid, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

// additional
import Button from "@mui/material/Button";
import BaseDialogForm from "@components/dialog/BaseDialogForm";
import Box from "@mui/material/Box";

interface IForm {
  name: string;
  description: string;
}

interface IFormCategoryProps {
  visible: boolean;
  form: IForm;
  loading: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormCategory: React.FC<IFormCategoryProps> = ({
  visible,
  onClose,
  onInputChange,
  onSubmit,
  form,
  loading,
}) => {
  const { name, description } = form;
  return (
    <BaseDialogForm
      visible={visible}
      title="Form Tambah Kategori"
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
            disabled={name === "" || description === ""}
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
                <TextField
                  fullWidth
                  label="Nama"
                  name="name"
                  placeholder="Masukkan nama kategori"
                  value={name}
                  onChange={onInputChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  value={description}
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
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </BaseDialogForm>
  );
};

export default React.memo(FormCategory);
