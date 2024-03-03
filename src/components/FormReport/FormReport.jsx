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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FormReport({ getID }) {
    console.log(getID);
    const [open, setOpen] = React.useState(false);
    const [reportDetail, setReportDetail] = React.useState('');


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleReport = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/reports/customer/submitreport', {
                reportDetail: reportDetail,
                accID: 4,
                bookingID: 24,
                productID: getID
            });

            console.log(response.data); // Xử lý phản hồi thành công
            setOpen(true);
        } catch (error) {
            console.error('Cannot report:', error); // Xử lý lỗi
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
                <DialogActions>
                    <Button onClick={handleClose}>cancel</Button>
                    <Button onClick={handleReport}>save</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
