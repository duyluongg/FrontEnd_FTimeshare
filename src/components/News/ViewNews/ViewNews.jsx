import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ViewNews() {
    const [newsDetail, setNewsDetail] = useState(null);
    const [authorData, setAuthorData] = useState(null);
    const newsId = useParams();
    console.log(newsId.id);

    useEffect(() => {
        const fetchNewsDetail = async () => {
            try {

                const response = await axios.get(`http://localhost:8080/api/news/viewDetail/${newsId.id}`);
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
    }, [newsId.id]);

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
    // const projectImage = images.find(image => image.productID === item.productID);
    return (
        <div className="view-news">
            <h1 className="news-title">{newsDetail.newsTitle}</h1>
            <img src={`http://localhost:8080/api/news/imgView/${newsDetail.imgName}`} alt={newsDetail.imgName} className="news-image" />
            <p className="news-content">{newsDetail.newsContent}</p>
            <div className="news-author">By {authorData.accName}</div>
        </div>
    );
}

export default ViewNews;
