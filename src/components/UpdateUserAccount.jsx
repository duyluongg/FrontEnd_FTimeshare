import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SnackBar from './SnackBar.jsx';

import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FormUpdateUser({ getID, updateUserList }) {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [snackbarColor, setSnackbarColor] = React.useState('success');
    const [errors, setErrors] = useState({}); 

 
  

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();

        try {
            await schema.validate({ name, phoneNumber }, { abortEarly: false });
            const response = await axios.put(
                `https://65f79c2bb4f842e80885bd92.mockapi.io/crud/${getID}`,
                { name, phoneNumber }
            );
            updateUserList();
            console.log(response.data);
            setSnackbarMessage('Update successfully !!!');
            setSnackbarColor('success');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error updating user:', error);
            setSnackbarMessage('Update failed :(((');
            setSnackbarColor('error');
            setSnackbarOpen(true);
            if (error instanceof Yup.ValidationError) {
                const yupErrors = {};
                error.inner.forEach(err => {
                    yupErrors[err.path] = err.message;
                });
                setErrors(yupErrors);
            } else {
                console.error('Error:', error);
            }
        }
    };

    const schema = Yup.object().shape({
        name: Yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
        phoneNumber: Yup.string().required('Phone number is required')
            .matches(/^[0-9]+$/, 'Phone number must contain only digits')
            .min(10, 'Phone number must be at least 10 digits')
    });

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                EDIT
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                fullWidth
            >
                <DialogContent>
                    <TextField
                        sx={{ mt: '15px', mb: '15px' }}
                        id="name"
                        label="Name"
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                    <TextField
                        sx={{ mt: '15px', mb: '15px' }}
                        id="phone"
                        label="Phone"
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber}
                    />
                </DialogContent>
                <SnackBar open={snackbarOpen} message={snackbarMessage} onClose={handleSnackbarClose} color={snackbarColor} />
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleUpdateUser}>Save</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

