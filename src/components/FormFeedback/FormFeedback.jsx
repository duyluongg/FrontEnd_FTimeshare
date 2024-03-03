import * as React from 'react';
import axios from 'axios'; // Import axios library
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Rating from './rating.jsx'
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

export default function FormFeedback({ getID }) {
    console.log(getID);
    const [open, setOpen] = React.useState(false);
    const [feedbackDetail, setFeedbackDetail] = React.useState('');
    const [feedbackRating, setFeedbackRating] = React.useState(0);
    // const [productID, setProductID] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFeedback = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/feedback/customer/submitfeedback', {
                feedbackDetail: feedbackDetail,
                feedbackRating: feedbackRating,
                bookingID: 24,
                productID: getID
            });

            console.log(response.data); // Xử lý phản hồi thành công
            setOpen(true);
        } catch (error) {
            console.error('Cannot feedback:', error); // Xử lý lỗi
        }
    }

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Feedback
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
                        label="Feedback Detail"
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth
                        value={feedbackDetail}
                        onChange={(e) => setFeedbackDetail(e.target.value)}
                    />
                    {/* <TextField 
                        sx={{ mt: '15px', mb: '15px' }} 
                        id="feedback-rating" 
                        label="Feedback Rating" 
                        variant="outlined" 
                        multiline 
                        rows={4} 
                        fullWidth 
                        value={feedbackRating} 
                        onChange={(e) => setFeedbackRating(e.target.value)} 
                    /> */}

                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Rate</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={feedbackRating}
                                label="Age"
                                onChange={(e) => setFeedbackRating(e.target.value)} 
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                                <MenuItem value={7}>7</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                                <MenuItem value={9}>9</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>cancel</Button>
                    <Button onClick={handleFeedback}>save</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
