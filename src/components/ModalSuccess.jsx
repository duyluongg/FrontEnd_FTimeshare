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
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    color: "green",
    borderRadius: 8,


};

export default function ModalSuccess({ openModal, onClose }) {

    return (
        <div>

            <Modal
                open={openModal}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-description" sx={{ mt: 1, textAlign: "center" }}>
                        Successfully
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
