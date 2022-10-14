import React from "react";
// dialog component
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import { FormControl, Grid, TextField } from "@mui/material";

// additional
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SelectProperty from "../select/SelectProperty";
import { SelectOptionType } from "../../types";
import { AlertContext } from "../../provider/AlertProvider";
import { fetchData } from "../../lib/dataFetcher";

import { AutocompleteInputChangeReason } from "@mui/material/Autocomplete";


interface IModalProperties {
  edit: boolean;
  visible: boolean;
  onSubmit: () => void;
  form: any,
  onInputSelectChange?: (
    event: React.SyntheticEvent,
    value: string,
    reason: AutocompleteInputChangeReason,
  ) => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectProperty: (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: SelectOptionType | null
  ) => void;
  onClose: () => void;
}

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-paper": {
    width: "100%",
  },
}));

// tood: make dedicated modal components
const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const FormKlaster: React.FC<IModalProperties> = ({ edit, visible, onClose, onInputSelectChange, onInputChange, onSelectProperty, onSubmit, form }) => {


  return (
    <BootstrapDialog open={visible} onClose={onClose}>
      <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
        {edit ? 'Edit Klaster' : 'Tambah Klaster Baru'}
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <FormControl fullWidth>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={12}>
              <TextField value={form?.name} placeholder="Masukan nama klaster" label="Nama Klaster" name="name" onChange={onInputChange} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Deskripsi"
                placeholder="Masukan deskripsi klaster"
                multiline
                name="description"
                onChange={onInputChange}
                fullWidth
                value={form?.description}
              />
            </Grid>
            <Grid item xs={12}>
              <SelectProperty onInputChange={onInputSelectChange} placeholder="Masukan properti" value={form?.property} inputValue={form?.propertyInput || ''} onChange={onSelectProperty} />
            </Grid>
          </Grid>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" color="info" onClick={onSubmit}>
          Simpan
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default FormKlaster;
