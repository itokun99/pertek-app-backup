import {
  Dialog,
  DialogActions,
  DialogContent as MuiDialogContent,
  DialogProps,
  DialogTitle as MuiDialogTitle,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { CloseIcon } from '@theme/overrides/CustomIcons';
import { ReactNode } from 'react';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogContainerProps extends DialogProps {
  title?: string;
  footer?: ReactNode;
  closeButtonAction: () => void;
}

export const DialogContainer = ({ children, title, footer, closeButtonAction, ...props }: DialogContainerProps) => {
  return (
    <BootstrapDialog aria-labelledby='customized-dialog-title' {...props}>
      <MuiDialogTitle>
        {title}
        <IconButton
          aria-label='close'
          onClick={closeButtonAction}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </MuiDialogTitle>
      <MuiDialogContent dividers>{children}</MuiDialogContent>
      <DialogActions>{footer}</DialogActions>
    </BootstrapDialog>
  );
};
