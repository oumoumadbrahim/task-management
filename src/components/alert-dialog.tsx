import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface IAlertDialogProps {
  title: string;
  body: string;
  isOpen?: boolean;
  handleClose: (open: boolean) => void;
  onAgree: () => void;
}

export default function AlertDialog(props: IAlertDialogProps) {
  const { handleClose, onAgree, isOpen = false } = props;

  return (
    <Dialog
      open={isOpen}
      onClose={() => handleClose(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{props.body}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)}>Cancel</Button>
        <Button onClick={onAgree} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
