import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { MdDateRange } from "react-icons/md";
import "../Review/Review.css"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Pagination from '@mui/material/Pagination';
export default function Review() {
    const { reportID } = useParams();
    const [projectReport, setProjectReport] = useState({});
    useEffect(() => {
        fetchProjectActive();
    }, []);

    const fetchProjectActive = async () => {
        console.log(reportID);
        try {
            const response = await axios.get(`http://localhost:8080/api/reports/viewDetail/${reportID}`)
            console.log(response.data); // Log the response data directly
            setProjectReport(response.data);
            // console.log(response);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };
    return (

        <div>
            <div className='review-field'>
                <div className='review-field-child'>
                    <div className="information-customer">
                        <div className='review-avatar'>
                            <Avatar alt={projectReport.accID && projectReport.accID.accName[0]} sx={{ width: 63, height: 63 }} src="/static/images/avatar/1.jpg" />
                            <h2 className='name-avatar'> {projectReport.accID && projectReport.accID.accName}</h2>
                        </div>
                        <div className='detail-review'>
                            {/* <CalendarMonthIcon /> */}
                            {/* <div> 1 đêm - tháng 9/2023</div> */}

                        </div>


                    </div>



                    <div className="information-customer-review">
                        <div className='information-customer-review-flex'>
                            {/* <div className='review-mark'>10 <a className='review-mark-child'>/10</a></div> */}
                            <div className='review-mark-date'>{projectReport.reportCreateDate}</div>

                        </div>
                        <div className='review-content'>
                        {projectReport.reportDetail }
                        </div>
                        <div className='review-img'>
                            <img src='../image/prj/prj01.jpg' />
                        </div>

                        

                        {/* <div className='review-like'><button><ThumbUpIcon /> </button> 1 lượt thích đánh giá này</div> */}

                    </div>

                </div>

                







            </div>
            <Pagination count={10} color="primary" sx={{display: 'flex', alignItems:'center', justifyContent: 'center', mt:'25px'}} />


        </div>
    )
}
