// SnackBarRegister.js
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

export default function SnackBar({ open, message, onClose, color }) {
    const handleCloseSnackbar = () => {
        onClose(); 
    };

    return (
        <Snackbar open={open} autoHideDuration={4000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Alert
                onClose={handleCloseSnackbar}
                severity={color}
                variant="filled"
                sx={{ width: '100%' }}
            >
         
                {message}

            </Alert>
        </Snackbar>
    );
}
