import * as React from 'react';
import axios from 'axios'; // Import axios library
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
// import Rating from './rating.jsx'
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SnackBar from '../SnackBar.jsx';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FormReport({ getID, getBookID }) {
    console.log(getID);
    const [open, setOpen] = React.useState(false);
    const [reportDetail, setReportDetail] = React.useState('');
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [snackbarColor, setSnackbarColor] = React.useState('success'); 


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false); 
    };

    const handleReport = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://bookinghomestayswp.azurewebsites.net/api/reports/customer/submitreport', {
                reportDetail: reportDetail,
                accID: 4,
                bookingID: getBookID,
                productID: getID
            });

            console.log(response.data); 
            setOpen(true);
            setSnackbarMessage('Send report successfully !!!')
            setSnackbarColor("success"); 
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Cannot report:', error); 
            setSnackbarMessage('Send report failed !!!')
            setSnackbarColor("error"); 
            setSnackbarOpen(true);
        }
    }

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen} color='error'>
                Report
            </Button>
            <Dialog  
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                fullWidth
            >
                <DialogTitle>{"How would you rate this timeshare ?"}</DialogTitle>
                <DialogContent>
                    {/* <Rating /> */}
                    <TextField
                        sx={{ mt: '15px', mb: '15px' }}
                        id="feedback-detail"
                        label="Report Detail"
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth
                        value={reportDetail}
                        onChange={(e) => setReportDetail(e.target.value)}
                    />
               
                </DialogContent>
                <SnackBar open={snackbarOpen} message={snackbarMessage} onClose={handleSnackbarClose} color={snackbarColor} />

                <DialogActions>
                    <Button onClick={handleClose}>cancel</Button>
                    <Button onClick={handleReport}>save</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
