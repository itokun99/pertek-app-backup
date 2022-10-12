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

interface IModalProperties {
  visible: boolean;
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

const FormKlaster: React.FC<IModalProperties> = ({ visible, onClose }) => {
  const { setAlert } = React.useContext(AlertContext);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [form, setForm] = React.useState({
    name: "",
    properti: {
      label: "",
      value: "",
    },
  });

  const onInputchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((previousValues) => ({
      ...previousValues,
      [name]: value,
    }));
  };

  const onSelectProperti = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: SelectOptionType | null
  ) => {
    setForm((previousValues) => ({
      ...previousValues,
      properti: {
        label: newValue?.label || "",
        value: newValue?.value || "",
      },
    }));
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      // it should check if the form is empty
      if (form.name === "" || Object.values(form.properti).every((dt) => dt === "")) {
        setAlert({
          message: {
            severity: "warning",
            content: "Form tidak boleh kosong!",
          },
        });
        setIsLoading(false);
        return;
      }

      const payload = {
        name: form.name,
        property_id: form.properti.value,
        description: "desc..",
      };

      const { error } = await fetchData("/api/klaster", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (error) {
        setAlert({
          message: {
            severity: "error",
            content: error.message,
          },
        });
        setIsLoading(false);
        return;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BootstrapDialog open={visible} onClose={onClose}>
      <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
        Tambah Klaster Baru
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <FormControl fullWidth>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={12}>
              <TextField label="name" name="name" onChange={onInputchange} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <SelectProperty onChange={onSelectProperti} />
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
