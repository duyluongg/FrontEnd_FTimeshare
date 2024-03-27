import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Sidenav from '../Sidenav/Sidenav';
import { Button } from '@mui/material';
import ModalPopUpDelete from './ModalPopupDelete.jsx';
import FormUpdateNew from './FormUpdateNew.jsx'
import SnackBar from '../../SnackBar';

function ViewNewStaff() {
    const [newsDetail, setNewsDetail] = useState(null);
    const [authorData, setAuthorData] = useState(null);
    const { newsId } = useParams();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarColor, setSnackbarColor] = useState('success');
    console.log(newsId);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchNewsDetail = async () => {
            try {

                const response = await axios.get(`http://localhost:8080/api/news/viewDetail/${newsId}`);
                // const [imageNew] = await Promise.all(
                //     axios.get(`http://localhost:8080/api/news/view`)
                // );
                setNewsDetail(response.data);
                setAuthorData(response.data.accID);
                console.log(response.data.accID);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchNewsDetail();
    }, [newsId]);

    // useEffect(() => {
    //     if (news.length > 0) {
    //         const foundNews = news.find(item => item.newsID === parseInt(newsId.id));
    //         if (foundNews) {
    //             setNewsDetail(foundNews);
    //         }
    //     }
    // }, [news, newsId.id]);

    if (!newsDetail) {
        return <div>Loading...</div>;
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/news/delete/${newsId}`);
            setSnackbarMessage('Delete successfully !!!')
            setSnackbarColor("success");
            setSnackbarOpen(true);
            setTimeout(() => {
                navigate('/admin/all-new');
            }, 1000);
        } catch (error) {
            console.error('Error deleting new:', error);
        }
    };
    return (
        <div>
            <div className="view-news">
                <h1 className="news-title">{newsDetail.newsTitle}</h1>
                <img src={`http://localhost:8080/api/news/imgView/${newsDetail.imgName}`} alt={newsDetail.imgName} className="news-image" />
                <p className="news-content">{newsDetail.newsContent}</p>
                <div className="news-author">By {authorData.accName}</div>
                <ModalPopUpDelete onDelete={handleDelete} color='error' />
                <FormUpdateNew newsDetail={newsDetail} oldImageUrl={`http://localhost:8080/api/news/imgView/${newsDetail.imgName}`} />
            </div>
            <SnackBar open={snackbarOpen} message={snackbarMessage} onClose={handleSnackbarClose} color={snackbarColor} />
        </div>
    );
}

export default ViewNewStaff;
