import React, { useState } from 'react';

export default function CreateTimeshare() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [images, setImages] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', { title, description, location, images });
        setTitle('');
        setDescription('');
        setLocation('');
        setImages([]);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImages([...images, reader.result]);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <div className="create-container">
                <h1 className="create-title">Create Your Timeshare</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-container">
                        <div className="create-form">
                            <div className="input-container">
                                <label>
                                    Title
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </label>
                            </div>
                            <div className="input-container">
                                <label>
                                    Description
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </label>
                            </div>
                            <div className="input-container">
                                <label>
                                    Location
                                    <input
                                        type="text"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="create-submit">
                            <div className="input-container">
                                <label>
                                    Image
                                    <input type="file" onChange={handleImageUpload} />
                                </label>
                            </div>
                            <div className="images-container">
                                {images.map((image, index) => (
                                    <img key={index} className='image' src={image} alt="Uploaded" />
                                ))}
                            </div>
                            <button className="create-button" type="submit">Create Post</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};
