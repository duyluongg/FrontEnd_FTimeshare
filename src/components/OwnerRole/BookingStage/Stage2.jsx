import react from "react";
import { useState } from "react";
import axios from "axios";

const Stage2 = ({ handleNext, booking }) => {
    const [image, setImage] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const formData = new FormData();
            formData.append('pictures', image);

            // Tạo mảng các promises cho các yêu cầu POST
            const postRequests = booking.map((item) =>
                axios.post(`http://localhost:8080/api/bookings/customer/submit_payment/${item.bookingID}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
            );
            // Gửi các yêu cầu POST đồng thời và chờ cho tất cả các promise hoàn thành
            const responses = await Promise.all(postRequests);
            handleNext();

        } catch (error) {
            console.error('Lỗi đăng ký người dùng:', error.response.data); // Xử lý lỗi
            // Thiết lập thông điệp Snackbar
            // setSnackbarOpen(true); // Hiển thị Snackbar
        }
    };

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            previewImage(file);
            console.log(file);
        }
    };

    const previewImage = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label htmlFor="avatar">Upload Payment Image</label>
                    <input
                        type="file"
                        id="avatar"
                        onChange={handleUpload}
                    />
                    {imagePreview && (
                        <div className="input-container">
                            <label>Image Preview:</label>
                            <img src={imagePreview} alt="Image Preview" style={{ maxWidth: "100px", maxHeight: "100px" }} />
                        </div>
                    )}
                </div>
                <button className="register-button" type="submit">Submit</button>
            </form>

        </>
    );
};

export default Stage2;