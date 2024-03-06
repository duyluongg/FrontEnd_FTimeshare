import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ModalProfile({ accID }) {
    if (!accID || !accID.accName) {
        return null; // Trả về null nếu accID hoặc accName không tồn tại
    }
    console.log(accID);
    const { accName, accPhone, accEmail, accPassword, accBirthday, roleID } = accID;
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    
    return (
        <div>
            <Button onClick={handleOpen}>
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    {accName[0]}
                </Avatar>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style}>

                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Full of Name: {accName}
                    </Typography>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Birthday: {formatDate(accBirthday)}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Phone Number: {accPhone}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Email: {accEmail}
                    </Typography>



                </Box>

            </Modal>
        </div>
    );
}
