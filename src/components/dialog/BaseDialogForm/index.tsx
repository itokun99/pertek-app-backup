import React from 'react';
// dialog component
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

// additional
import { styled } from '@mui/material/styles';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface IBaseDialogForm {
  title: string;
  visible: boolean;
  fullScreen?: boolean;
  scroll?: DialogProps['scroll'];
  action?: React.ReactElement | JSX.Element | React.ReactNode | null;
  children?: React.ReactElement | JSX.Element | React.ReactNode | null;
  onClose: () => void;
}

export interface DialogTitleProps {
  id: string;
  children?: React.ReactElement | React.ReactNode | JSX.Element | null;
  onClose: () => void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiDialog-paper': {
    width: '100%',
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
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
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

const BaseDialogForm: React.FC<IBaseDialogForm> = ({
  title,
  visible,
  onClose,
  children,
  action,
  fullScreen = false,
  scroll = 'body',
}) => {
  return (
    <BootstrapDialog fullScreen={fullScreen} scroll={scroll} open={visible} onClose={onClose}>
      <BootstrapDialogTitle id='customized-dialog-title' onClose={onClose}>
        {title}
      </BootstrapDialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      {action && <DialogActions>{action}</DialogActions>}
    </BootstrapDialog>
  );
};

export default React.memo(BaseDialogForm);
