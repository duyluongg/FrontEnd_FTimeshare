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
import SnackBar from "../../SnackBar.jsx";

import { useNavigate, useParams } from 'react-router-dom';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FormUpdateNew({ newsDetail, oldImageUrl }) {
    const [open, setOpen] = React.useState(false);
    const [news, setNews] = useState('');
    const [newsTitle, setNewsTitle] = useState('');
    const [newsPost, setNewsPost] = useState('');
    const [newsContent, setNewsContent] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [snackbarColor, setSnackbarColor] = React.useState('success');
    const [avatarPreview, setAvatarPreview] = useState(null);
    const { newsId } = useParams();
    const navigate = useNavigate();
    console.log(newsId);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const formatDate = (date) => {
        console.log(date);
        const d = new Date(date);
        const year = d.getFullYear();
        const month = ('0' + (d.getMonth() + 1)).slice(-2);
        const day = ('0' + d.getDate()).slice(-2);
        const hours = ('0' + d.getHours()).slice(-2);
        const minutes = ('0' + d.getMinutes()).slice(-2);
        const seconds = ('0' + d.getSeconds()).slice(-2);
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
    };

    useEffect(() => {
        if (newsDetail) {
            setNewsTitle(newsDetail.newsTitle);
            setNewsContent(newsDetail.newsContent);
            setAvatarPreview(oldImageUrl);
        }
    }, [newsDetail]);

    const handleUpdateNew = async (e) => {
        e.preventDefault();
        console.log(newsId);
        try {

            const formData = new FormData();
            formData.append('news', news);
            formData.append('newsTitle', newsTitle);
            formData.append('newsContent', newsContent);
            formData.append('newsViewer', 200);
            formData.append('newsStatus', 'active');
            formData.append('accID', '2');

            const response = await axios.put(`http://localhost:8080/api/news/edit/${newsId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response.data);
            setSnackbarMessage('Update successfully !!!')
            setSnackbarColor("success");
            setSnackbarOpen(true);

        } catch (error) {
            console.error('Error updating new:', error.response.data);
            setSnackbarMessage('Update failed :(((');
            setSnackbarColor("error");
            setSnackbarOpen(true);
        }
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNews(file);
            previewImage(file);
        }
    };

    const previewImage = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setAvatarPreview(reader.result);
        };
    };

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
                    <div className="input-container">
                        <label htmlFor="avatar">Image New</label>
                        <input
                            type="file"
                            id="imgNew"
                            onChange={handleAvatarChange}
                        />
                        {avatarPreview && (
                            <div className="input-container">
                                <label>Avatar Preview:</label>
                                <img src={avatarPreview} alt="Avatar Preview" style={{ maxWidth: "100px", maxHeight: "100px" }} />
                            </div>
                        )}
                    </div>

                    <TextField
                        sx={{ mt: '15px', mb: '15px' }}
                        id="title"
                        label="Title"
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth
                        value={newsTitle}
                        onChange={(e) => setNewsTitle(e.target.value)}
                    />
                    <TextField
                        sx={{ mt: '15px', mb: '15px' }}
                        id="content"
                        label="Content"
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth
                        value={newsContent}
                        onChange={(e) => setNewsContent(e.target.value)}
                    />


                </DialogContent>
                <SnackBar open={snackbarOpen} message={snackbarMessage} onClose={handleSnackbarClose} color={snackbarColor} />
                <DialogActions>
                    <Button onClick={handleClose}>cancel</Button>
                    <Button onClick={handleUpdateNew}>save</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
