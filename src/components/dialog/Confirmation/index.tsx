import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { memo } from 'react';

interface IConfirmationProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText: string;
  cancelText: string;
}

function Confirmation({
  open,
  title,
  description,
  confirmText,
  cancelText,
  onClose,
  onConfirm,
  onCancel,
}: IConfirmationProps): React.ReactElement {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      keepMounted
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{cancelText}</Button>
        <Button onClick={onConfirm}>{confirmText}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default memo(Confirmation);
