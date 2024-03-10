import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import SnackBar from '../../SnackBar';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../UserContext';

export default function Update() {

    const { user } = useContext(UserContext);
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [projects, setProjects] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
    // const [snackbarOpen, setSnackbarOpen] = useState(false);
    // const [snackbarMessage, setSnackbarMessage] = useState('');
    // const [snackbarColor, setSnackbarColor] = useState('success');

    const navigate = useNavigate();



    useEffect(() => {
        const fetchData = async () => {
            try {
                const projectResponse = await axios.get('http://localhost:8080/api/project/customer/viewproject');
                setProjects(projectResponse.data);

                const productTypeResponse = await axios.get('http://localhost:8080/api/productType/customer/viewproductType');
                setProductTypes(productTypeResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const accID = user ? user.id : null;
        setCreateProductData(prevData => ({
            ...prevData,
            accID: accID
        }));
    }, [user]);

    const [createProductData, setCreateProductData] = useState({
        productName: '',
        productArea: 0.0,
        productAddress: '',
        productDescription: '',
        productConvenience: '',
        productPrice: 0.0,
        availableStartDate: '',
        availableEndDate: '',
        productStatus: "Pending",
        productPerson: 0,
        productRating: 0.0,
        productSale: 0,
        productViewer: 0,
        projectID: 2, //
        productTypeID: 1, //
        accID: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCreateProductData({
            ...createProductData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const formattedStartDate = new Date(createProductData.availableStartDate).toISOString();
        // const formattedEndDate = new Date(createProductData.availableEndDate).toISOString();
        const startDateObj = new Date(createProductData.availableStartDate);
        const endDateObj = new Date(createProductData.availableEndDate);
        const formattedStartDate = startDateObj.toISOString().split('T')[0] + 'T08:00:00';
        const formattedEndDate = endDateObj.toISOString().split('T')[0] + 'T08:00:00';

        const productDataToSend = {
            ...createProductData,
            availableStartDate: formattedStartDate,
            availableEndDate: formattedEndDate,
        };
        console.log(productDataToSend);

        try {
            const productResponse = await axios.post('http://localhost:8080/api/products/add', productDataToSend);
            console.log('Product created:', productResponse.data);

            const productID = productResponse.data.productID;

            const formData = new FormData();
            images.forEach((image) => {
                formData.append('pictures', image);
            });
            console.log(images);

            const imageResponse = await axios.post(`http://localhost:8080/api/pictures/${productID}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Image uploaded successfully', imageResponse.data);
            // setSnackbarMessage('Create timeshare successfully!!!')
            // setSnackbarColor("success");
            // setSnackbarOpen(true);
            navigate('/owner-page');

        } catch (error) {
            console.error('Error creating product:', error);
            // setSnackbarMessage('Create timeshare failed!!!');
            // setSnackbarColor("error");
            // setSnackbarOpen(true);
        }
    };


    const handleUpload = (e) => {
        const files = Array.from(e.target.files);
        const previews = files.map((file) => URL.createObjectURL(file));

        setImages([...images, ...files]);
        setImagePreviews([...imagePreviews, ...previews]);
    };

    const handleDeselect = (index) => {
        const newImages = [...images];
        const newImagePreviews = [...imagePreviews];

        newImages.splice(index, 1);
        newImagePreviews.splice(index, 1);

        setImages(newImages);
        setImagePreviews(newImagePreviews);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
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
                                    Name
                                    <input
                                        type="text"
                                        name="productName"
                                        value={createProductData.productName}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                            <div className="input-container">
                                <label>
                                    Description
                                    <textarea
                                        name="productDescription"
                                        value={createProductData.productDescription}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                            <div className="input-container">
                                <label>
                                    Address
                                    <input
                                        name="productAddress"
                                        type="text"
                                        value={createProductData.productAddress}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                            <div className="input-container">
                                <label>
                                    Convenience
                                    <textarea
                                        name="productConvenience"
                                        value={createProductData.productConvenience}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                            <div className="input-container flex-2">
                                <label>
                                    Project Name
                                    <select
                                        name="projectID"
                                        value={createProductData.projectID}
                                        onChange={handleChange}
                                    >
                                        {projects.map(project => (
                                            <option key={project.projectID} value={project.projectID}>
                                                {project.projectName}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                <label>
                                    Type of timeshare
                                    <select
                                        name="productTypeID"
                                        value={createProductData.productTypeID}
                                        onChange={handleChange}
                                    >
                                        {productTypes.map(productType => (
                                            <option key={productType.productTypeID} value={productType.productTypeID}>
                                                {productType.productTypeName}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                            <div className="input-container flex-3">
                                <label>
                                    Area
                                    <input
                                        name="productArea"
                                        type="number"
                                        value={createProductData.productArea}
                                        onChange={handleChange}
                                        placeholder='Square metre'
                                    />
                                </label>
                                <label>
                                    Price
                                    <input
                                        name="productPrice"
                                        type="number"
                                        value={createProductData.productPrice}
                                        onChange={handleChange}

                                    />
                                </label>
                                <label>
                                    Person
                                    <input
                                        name="productPerson"
                                        type="number"
                                        value={createProductData.productPerson}
                                        onChange={handleChange}

                                    />
                                </label>
                            </div>
                            <div className="input-container flex-2">
                                <label>
                                    Available start-date
                                    <input
                                        name="availableStartDate"
                                        type="date"
                                        value={createProductData.availableStartDate}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    Available end-date
                                    <input
                                        name="availableEndDate"
                                        type="date"
                                        value={createProductData.availableEndDate}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                        </div>
                        <div className="create-submit">
                            <div className="input-container">
                                <label>
                                    Image
                                    <input
                                        type="file"
                                        id="image"
                                        onChange={handleUpload}
                                        multiple
                                        value={imagePreviews.length === 0 ? '' : undefined}
                                    />
                                </label>
                            </div>
                            {imagePreviews.map((preview, index) => (
                                <div className="input-container" key={index}>
                                    <img src={preview} alt="Image Preview" />
                                    <button type="button" onClick={() => handleDeselect(index)}>Remove</button>
                                </div>
                            ))}


                        </div>
                        <button className="create-button" type="submit">Create Post</button>
                    </div>
                </form>
                {/* <SnackBar open={snackbarOpen} message={snackbarMessage} onClose={handleSnackbarClose} color={snackbarColor} /> */}
            </div>
        </>
    );
}