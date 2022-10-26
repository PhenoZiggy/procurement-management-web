import { Alert, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Menu from '../../components/menubar/Menu';
import NavBar from '../../components/nav-bar/NavBar';
import { observer } from 'mobx-react-lite';
import {Store} from '../../store/storeInitialize';

const PageLayout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('error');

  useEffect(() => {
    if (Store.state?.status) {
      setSeverity(Store.state.status);
      setOpen(true);
    }
  }, [Store.state]);

  useEffect(() => {
    Store.clearError();
    setOpen(false);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="w-full">
      <div className="bg-yellow-200">
        <NavBar />
      </div>
      <div className="sticky top-0 bg-yellow-100 z-10">
        <Menu />
      </div>
      <div className="h-full">
        {children}
        <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            {Store.state?.message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default observer(PageLayout);
