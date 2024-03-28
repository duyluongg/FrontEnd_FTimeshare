import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 10

};

export default function ModalTerm() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            {/* <div style={{ display: "flex", alignItems: "center" }}> */}
                {/* <span>ACCEPT</span> */}
                <Button onClick={handleOpen} >
                    <span style={{ color: "#CD9A2B" }}>Term & Services</span>
                </Button>
            {/* </div> */}


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontWeight: "bold", color: "#CD9A2B" }}>
                        Term & Services
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Welcome to Booking Homestay! These Terms of Service outline the rules and regulations for the use of our website.
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        By accessing this website, we assume you accept these terms and conditions. Do not continue to use Booking Homestay if you do not agree to take all of the terms and conditions stated on this page.
                    </Typography>

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <span style={{ fontWeight: "bold" }}>Cookies<br /></span>
                        We employ the use of cookies. By accessing Booking Homestay, you agreed to use cookies in agreement with the Company’s Privacy Policy.
                    </Typography>

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>

                        <span style={{ fontWeight: "bold" }}> Cancellations and Refunds<br /></span>

                        Cancellation policies vary depending on the hotel or accommodation provider. Please review the cancellation policy carefully before making a booking.

                        Refunds, if applicable, will be subject to the cancellation policy of the hotel or accommodation provider.
                    </Typography>

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>

                        <span style={{ fontWeight: "bold" }}> License<br /></span>

                        Unless otherwise stated, the Company and/or its licensors own the intellectual property rights for all material on Booking Homestay. All intellectual property rights are reserved. You may access this from Booking Homestay for your own personal use subjected to restrictions set in these terms and conditions.                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
