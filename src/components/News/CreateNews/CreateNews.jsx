import React, { useState } from 'react';
import axios from 'axios';

function CreateNews() {
    const [formData, setFormData] = useState({
        newsTitle: '',
        newsContent: '',
        newsPicture: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const image = e.target.files[0];
        setFormData({
            ...formData,
            newsPicture: image,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('newsTitle', formData.newsTitle);
        formDataToSend.append('newsContent', formData.newsContent);
        formDataToSend.append('image', formData.newsPicture);
        console.log(formDataToSend);
        try {
            await axios.post('http://localhost:8080/api/news/add', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Đặt kiểu phương tiện là multipart/form-data
                },
            });
            // Xử lý sau khi gửi thành công, ví dụ: chuyển hướng hoặc hiển thị thông báo thành công
        } catch (error) {
            console.error('Error creating news:', error);
            // Xử lý lỗi, ví dụ: hiển thị thông báo lỗi
        }
    };

    return (
        <div className="create-news">
            <h1>Create News</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title:</label>
                    <input type="text" name="newsTitle" value={formData.newsTitle} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Content:</label>
                    <textarea name="newsContent" value={formData.newsContent} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Image:</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} required />
                </div>
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
}

export default CreateNews;
