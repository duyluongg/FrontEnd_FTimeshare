import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import Avatar from 'react-avatar';
import Avatar from '@mui/material/Avatar';
import { MdDateRange } from "react-icons/md";
import "../Review/Review.css"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Pagination from '@mui/material/Pagination';
export default function Review() {


    return (

        <div>
            <div className='review-field'>
                <div className='review-field-child'>
                    <div className="information-customer">
                        <div className='review-avatar'>
                            <Avatar alt='' sx={{ width: 63, height: 63 }} src="/static/images/avatar/1.jpg" />
                            <h2 className='name-avatar'>Luong ngoc phuong duy </h2>
                        </div>
                        <div className='detail-review'>
                            {/* <CalendarMonthIcon /> */}
                            <div> 1 đêm - tháng 9/2023</div>

                        </div>


                    </div>



                    <div className="information-customer-review">
                        <div className='information-customer-review-flex'>
                            <div className='review-mark'>9<a>/10</a></div>
                            <div className='review-mark-date'>19/10/2003</div>
                        </div>
                        <div className='review-content'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, rerum ipsum quia velit, eaque possimus ratione unde, maxime maiores sapiente accusantium iste modi tenetur mollitia deleniti laudantium. Similique, eum explicabo.
                        </div>
                        <div className='review-img'>
                            <img src='../image/prj/prj01.jpg' />
                        </div>



                        <div className='review-like'><button><ThumbUpIcon /> </button> 1 lượt thích đánh giá này</div>

                    </div>

                </div>









            </div>
            <Pagination count={10} color="primary" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: '25px' }} />


        </div>
    )
}
