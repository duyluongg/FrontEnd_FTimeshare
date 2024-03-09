import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useNavigate } from 'react-router-dom'; // Thêm import useNavigate

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function ModalCreateBook({ handleModal }) {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate(); // Sử dụng hook useNavigate để điều hướng
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleConfirm = async (e) => { 
      e.preventDefault(); 
      await handleModal(e); 
      handleClose();
      navigate('/view-booking-history'); 

    };
  
    return (
      <React.Fragment>
        <Button  onClick={handleClickOpen}>
          Submit
        </Button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
        
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
            Are you sure to book this apartment?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>NO</Button>
            <Button onClick={handleConfirm}>YES</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
  