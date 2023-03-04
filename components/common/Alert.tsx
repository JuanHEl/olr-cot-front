import React from 'react';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';

type AlertPropsType = {
  open: boolean;
  onClose: () => void;
  severity: 'error' | 'warning' | 'info' | 'success';
  message: string;
};

const CustomAlert = (props: any) => {
  return <Alert elevation={6} variant="filled" {...props} />;
}

const CustomizedSnackbar = (props: any) => {
  return <Snackbar {...props} />;
}

const CustomizedAlert = (props: AlertPropsType) => {
  const { open, onClose, severity, message } = props;
  return (
    <CustomizedSnackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <CustomAlert onClose={onClose} severity={severity}>
        {message}
      </CustomAlert>
    </CustomizedSnackbar>
  );
};

export default CustomizedAlert;
