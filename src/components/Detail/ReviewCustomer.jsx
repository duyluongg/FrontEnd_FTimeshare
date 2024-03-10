import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { MdDateRange } from "react-icons/md";
import "../Review/Review.css"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Pagination from '@mui/material/Pagination';

export default function ReviewCustomer({ getID }) {

    console.log(getID);
    const [getReview, setGetReview] = useState([])

    useEffect(() => {
        const fetchViewReview = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/feedback/viewByProductId/${getID}`);
                const formattedData = response.data.map(item => ({
                    ...item,
                    feedbackCreateDate: new Date(...item.feedbackCreateDate).toLocaleDateString('en-GB')
                }));
                setGetReview(formattedData);
                console.log(formattedData);

            } catch (error) {
                console.error('Error fetching view review:', error);
            }
        };

        fetchViewReview();
    }, []);

    return (
        <div>
            <div className='review-field'>
                {getReview.map((item) => (
                    <div key={item.feedbackID} className='review-field-child'>
                        <div className="information-customer">
                            <div className='review-avatar'>
                                <Avatar alt='' sx={{ width: 63, height: 63 }} src="/static/images/avatar/1.jpg" />
                                <h2 className='name-avatar'>Luong ngoc phuong duy </h2>
                            </div>
                            <div className='detail-review'>
                                {/* <CalendarMonthIcon /> */}
                                {/* <div> 1 đêm - tháng 9/2023</div> */}
                            </div>
                        </div>
                        <div className="information-customer-review">
                            <div className='information-customer-review-flex'>
                                <div className='review-mark'>{item.feedbackRating}<a>/10</a></div>
                                <div className='review-mark-date'>{item.feedbackCreateDate}</div>
                            </div>
                            <div className='review-content'>
                                {item.feedbackDetail}
                            </div>
                            <div className='review-img'>
                                <img src='../image/prj/prj01.jpg' alt='' />
                            </div>
                            {/* <div className='review-like'><button><ThumbUpIcon /> </button> 1 lượt thích đánh giá này</div> */}
                        </div>
                    </div>
                ))}
            </div>
            <Pagination count={10} color="primary" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: '25px' }} />
        </div>
    )
}
