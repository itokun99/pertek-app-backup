import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { FormControl, TextField, InputLabel, Input } from "@mui/material";
import { Label } from "@mui/icons-material";
import { Stack } from "@mui/system";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

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

export default function AddNewTenant({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Function;
}) {
  return (
    <BootstrapDialog
      onClose={() => setOpen(false)}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <BootstrapDialogTitle
        id="customized-dialog-title"
        onClose={() => setOpen(false)}
      >
        Tambah Tenant Baru
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <FormControl>
          <Stack gap={2}>
            <Stack direction="row" gap={2}>
              <TextField label="Nama Depan" />
              <TextField label="Nama Belakang" />
            </Stack>
            <TextField label="No Telpon" />
          </Stack>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => setOpen(false)}>
          Simpan Data
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
