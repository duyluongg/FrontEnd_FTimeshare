// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import ModalReport from './ModalReport'; // Import ModalReport component

// export default function ModalReject({ openModalConfirm, getProductID }) {
//     const [open, setOpen] = React.useState(false);

//     const handleClickOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     // const handleCloseProduct = () => {
//     //     setOpen(false); // Đóng modal khi ấn Reject
//     //     handleClickOpen(); // Mở modal report
//     // };

//     return (
//         <React.Fragment>
//             {/* <Button variant="outlined" onClick={handleCloseProduct} color='error'>
//                 REJECT
//             </Button> */}
//             {/* Hiển thị ModalReport */}
//             <ModalReport getProductID={getProductID} open={open} handleClose={handleClose} />
//         </React.Fragment>
//     );
// }
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
import SnackBar from './SnackBar';
import { useNavigate } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalReport({ getProductID }) {
    console.log(getProductID);
    const [open, setOpen] = React.useState(false);
    const [rejectDetail, setRejectDetail] = React.useState('');
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [snackbarColor, setSnackbarColor] = React.useState('success');
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    console.log(token);
    const headers = { headers: { 'Authorization': `Bearer ${token}` } };


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleReject = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('reason', rejectDetail);
        
        try {
            const response = await axios.put(`https://bookinghomestayswp.azurewebsites.net/api/products/staff/reject/${getProductID}`, formData, headers);
        
            console.log(response.data);
            setOpen(true);
            setSnackbarMessage('Send reject detail successfully !!!');
            setSnackbarColor("success");
            setSnackbarOpen(true);
            setTimeout(() => navigate("/staff/total-product"), 2000);
        
        } catch (error) {
            console.error('Cannot report:', error);
            setSnackbarMessage('Send reject detail failed !!!');
            setSnackbarColor("error");
            setSnackbarOpen(true);
        }
        
    }

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen} color='error'>
                Reject
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                fullWidth
            >
                <DialogTitle>{" The reason you do not accept this product? ?"}</DialogTitle>
                <DialogContent>
                    {/* <Rating /> */}
                    <TextField
                        sx={{ mt: '15px', mb: '15px' }}
                        id="reject-detail"
                        label="Reject Detail"
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth
                        value={rejectDetail}
                        onChange={(e) => setRejectDetail(e.target.value)}
                    />

                </DialogContent>
                <SnackBar open={snackbarOpen} message={snackbarMessage} onClose={handleSnackbarClose} color={snackbarColor} />

                <DialogActions>
                    <Button onClick={handleClose}>cancel</Button>
                    <Button onClick={handleReject}>send</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
