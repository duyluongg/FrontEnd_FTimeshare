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
    const [getReview, setGetReview] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchViewReview = async () => {
            try {
                const response = await axios.get(`https://bookinghomestayswp.azurewebsites.net/api/feedback/viewByProductId/${getID}`);
                const formattedData = response.data.map(item => ({
                    ...item,
                    feedbackCreateDate: new Date(...item.feedbackCreateDate).toLocaleDateString('en-GB')
                }));
                setGetReview(formattedData);
                setIsLoading(false);
                console.log(formattedData);

            } catch (error) {
                console.error('Error fetching view review:', error);
                setIsLoading(false);
            }
        };

        fetchViewReview();
    }, []);

    // Logic to paginate reviews
    const indexOfLastReview = currentPage * 3;
    const indexOfFirstReview = indexOfLastReview - 3;
    const currentReviews = getReview.slice(indexOfFirstReview, indexOfLastReview);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <div>
            {isLoading ? (
                <div className='review-field-child'>Loading...</div>
            ) : getReview.length === 0 ? (
                <p className='no-feedback'>This product currently has no feedback</p>
            ) : (
                <div>
                    <div className='review-field'>
                        {currentReviews.map((item) => (
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
                                    {/* <div className='review-img'>
                                        <img src='../image/prj/prj01.jpg' alt='' />
                                    </div> */}
                                    {/* <div className='review-like'><button><ThumbUpIcon /> </button> 1 lượt thích đánh giá này</div> */}
                                </div>
                            </div>
                        ))}
                    </div>
                    <Pagination
                        count={Math.ceil(getReview.length / 3)}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: '25px' }}
                    />
                </div>
            )}
        </div>
    )
}
