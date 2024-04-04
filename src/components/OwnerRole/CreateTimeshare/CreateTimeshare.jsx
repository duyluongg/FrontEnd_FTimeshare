import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SnackBar from '../../SnackBar';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../UserContext';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function CreateTimeshare() {

    const { user } = useContext(UserContext);
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [projects, setProjects] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarColor, setSnackbarColor] = useState('success');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [provinces, setProvinces] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const projectResponse = await axios.get('https://bookinghomestayswp.azurewebsites.net/api/project/customer/viewproject');
                setProjects(projectResponse.data);

                const productTypeResponse = await axios.get('https://bookinghomestayswp.azurewebsites.net/api/productType/customer/viewproductType');
                setProductTypes(productTypeResponse.data);

                const provinceResponse = await axios.get('https://vapi.vnappmob.com/api/province/');
                setProvinces(provinceResponse.data.results);
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
        availableStartDate: new Date('2024-01-01T00:00:00'),
        availableEndDate: new Date('2100-01-01T00:00:00'),
        productStatus: "Pending",
        productPerson: 0,
        productRating: 0.0,
        productSale: 0,
        productViewer: 0,
        projectID: 2,
        productTypeID: 1,
        accID: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCreateProductData({
            ...createProductData,
            [name]: value,
        });
    };

    const handleDate = (date, fieldName) => {
        setCreateProductData({
            ...createProductData,
            [fieldName]: date,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {}
        if (!createProductData.productName.trim()) {
            validationErrors.productName = "Name of Homestay is required"
        }

        if (!createProductData.productDescription.trim()) {
            validationErrors.productDescription = "Description is required"
        } else if (createProductData.productDescription.trim().length > 1000) {
            validationErrors.productDescription = "Description must be less than or equal to 1000 characters";
        }

        if (!selectedProvince) {
            validationErrors.selectedProvince = "Province/City is required"
        }

        if (!createProductData.productAddress.trim()) {
            validationErrors.productAddress = "Address is required"
        }

        if (!createProductData.productConvenience.trim()) {
            validationErrors.productConvenience = "Amenities of Homestay is required"
        } else if (createProductData.productConvenience.trim().length > 1000) {
            validationErrors.productConvenience = "Amenities must be less than or equal to 1000 characters";
        }

        if (!createProductData.productArea) {
            validationErrors.productArea = "Area is required";
        } else if (!/^\d+(\.\d+)?$/.test(createProductData.productArea)) {
            validationErrors.productArea = "Area must be a number";
        }

        if (!createProductData.productPrice) {
            validationErrors.productPrice = "Price is required";
        } else if (!/^\d+(\.\d+)?$/.test(createProductData.productPrice)) {
            validationErrors.productPrice = "Price must be a number";
        }

        if (!createProductData.productPerson || createProductData.productPerson < 1) {
            validationErrors.productPerson = "At least 1 person required";
        }

        // if (!createProductData.availableStartDate) {
        //     validationErrors.availableStartDate = "Start date is required";
        // }

        // if (!createProductData.availableEndDate) {
        //     validationErrors.availableEndDate = "End date is required";
        // }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0 && !isLoading) {

            if (images.length === 0) {
                setSnackbarMessage('Images are required to create post!!!');
                setSnackbarColor("error");
                setSnackbarOpen(true);
                return;
            }

            if (images.length < 4) {
                setSnackbarMessage('You must upload at least 4 images to create post!!!');
                setSnackbarColor("error");
                setSnackbarOpen(true);
                return;
            }

            if (images.length > 10) {
                setSnackbarMessage('Maximum 10 images are allowed!!!');
                setSnackbarColor("error");
                setSnackbarOpen(true);
                return;
            }

            const fileSizeLimit = 2 * 1024 * 1024; // 2MB
            for (let i = 0; i < images.length; i++) {
                if (images[i].size > fileSizeLimit) {
                    setSnackbarMessage('Each image must be less than 2MB!!!');
                    setSnackbarColor("error");
                    setSnackbarOpen(true);
                    return;
                }
            }

            // const startDateObj = new Date(createProductData.availableStartDate);
            // const endDateObj = new Date(createProductData.availableEndDate);
            // const formattedStartDate = startDateObj.toISOString().split('T')[0] + 'T08:00:00';
            // const formattedEndDate = endDateObj.toISOString().split('T')[0] + 'T08:00:00';

            const address = createProductData.productAddress + `, ${selectedProvince.province_name}`;

            const productDataToSend = {
                ...createProductData,
                productAddress: address,
                // availableStartDate: formattedStartDate,
                // availableEndDate: formattedEndDate,
            };
            console.log(productDataToSend);
            setIsLoading(true);

            try {
                const productResponse = await axios.post('https://bookinghomestayswp.azurewebsites.net/api/products/add', productDataToSend);
                console.log('Product created:', productResponse.data);

                const productID = productResponse.data.productID;

                const formData = new FormData();
                images.forEach((image) => {
                    formData.append('pictures', image);
                });
                console.log(images);

                const imageResponse = await axios.post(`https://bookinghomestayswp.azurewebsites.net/api/pictures/${productID}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('Image uploaded successfully');
                setSnackbarMessage('Create homestay successfully!!!')
                setSnackbarColor("success");
                setSnackbarOpen(true);
                setTimeout(() => navigate('/'), 1000);
            } catch (error) {
                console.error('Error creating product:', error);
                setSnackbarMessage('Create homestay failed!!!');
                setSnackbarColor("error");
                setSnackbarOpen(true);
                setIsLoading(false);
            }
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
                <h1 className="create-title">Create Your Homestay</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-container">
                        <div className="create-form">
                            <div className="input-create-product">
                                <FormControl fullWidth sx={{ m: 1 }}>
                                    <InputLabel
                                        htmlFor="outlined-required"
                                        sx={{
                                            '&.Mui-focused': {
                                                color: '#CD9A2B',
                                            },
                                        }}
                                    >
                                        Name *
                                    </InputLabel>
                                    <OutlinedInput
                                        id="outlined-required"
                                        name="productName"
                                        label="Name of Homestay"
                                        value={createProductData.productName}
                                        onChange={handleChange}
                                        sx={{
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#CD9A2B',
                                            },
                                        }}
                                        error={errors.productName}
                                    />
                                    {errors.productName && <span style={{ color: 'red' }}>{errors.productName}</span>}
                                </FormControl>
                            </div>
                            <div className="input-create-product">
                                <FormControl fullWidth sx={{ m: 1 }}>
                                    <InputLabel
                                        htmlFor="outlined-required"
                                        sx={{
                                            '&.Mui-focused': {
                                                color: '#CD9A2B',
                                            },
                                        }}
                                    >
                                        Description *
                                    </InputLabel>
                                    <OutlinedInput
                                        id="outlined-required"
                                        name="productDescription"
                                        label="Description"
                                        multiline
                                        rows={8}
                                        value={createProductData.productDescription}
                                        onChange={handleChange}
                                        sx={{
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#CD9A2B',
                                            },
                                        }}
                                        error={errors.productDescription}
                                    />
                                </FormControl>
                                {errors.productDescription && <span style={{ color: 'red' }}>{errors.productDescription}</span>}
                            </div>
                            <div className="input-create-product">
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Province/City *"
                                    name="province"
                                    value={selectedProvince ? selectedProvince.province_id : ''}
                                    onChange={(e) => {
                                        const selectedProvinceId = e.target.value;
                                        const selectedProvinceObj = provinces.find(province => province.province_id === selectedProvinceId); // Tìm đối tượng tỉnh/thành phố dựa trên ID
                                        setSelectedProvince(selectedProvinceObj); // Cập nhật selectedProvince thành đối tượng tìm thấy
                                    }}
                                    fullWidth sx={{
                                        m: 1,
                                        '& .MuiFormLabel-root.Mui-focused': {
                                            color: '#CD9A2B',
                                        },
                                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#CD9A2B',
                                        },
                                        '& .MuiMenuItem-root': {
                                            color: '#CD9A2B',
                                        },
                                    }}
                                    error={errors.selectedProvince}
                                >
                                    {provinces.map(province => (
                                        <MenuItem key={province.province_id} value={province.province_id}>
                                            {province.province_name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                {errors.selectedProvince && <span style={{ color: 'red' }}>{errors.selectedProvince}</span>}
                            </div>
                            <div className="input-create-product">
                                <FormControl fullWidth sx={{ m: 1 }}>
                                    <InputLabel
                                        htmlFor="outlined-required"
                                        sx={{
                                            '&.Mui-focused': {
                                                color: '#CD9A2B',
                                            },
                                        }}
                                    >
                                        Address *
                                    </InputLabel>
                                    <OutlinedInput
                                        id="outlined-required"
                                        name="productAddress"
                                        label="Address"
                                        value={createProductData.productAddress}
                                        onChange={handleChange}
                                        sx={{
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#CD9A2B',
                                            },
                                        }}
                                        error={errors.productAddress}
                                    />
                                </FormControl>
                                {errors.productAddress && <span style={{ color: 'red' }}>{errors.productAddress}</span>}
                            </div>
                            <div className="input-create-product">
                                <FormControl fullWidth sx={{ m: 1 }}>
                                    <InputLabel
                                        htmlFor="outlined-required"
                                        sx={{
                                            '&.Mui-focused': {
                                                color: '#CD9A2B',
                                            },
                                        }}
                                    >
                                        Amenities *
                                    </InputLabel>
                                    <OutlinedInput
                                        id="outlined-required"
                                        name="productConvenience"
                                        label="Amenities"
                                        multiline
                                        rows={4}
                                        value={createProductData.productConvenience}
                                        onChange={handleChange}
                                        sx={{
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#CD9A2B',
                                            },
                                        }}
                                        error={errors.productConvenience}
                                    />
                                </FormControl>
                                {errors.productConvenience && <span style={{ color: 'red' }}>{errors.productConvenience}</span>}
                            </div>
                            <div className="input-create-product flex-2">
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Contractor *"
                                    name="projectID"
                                    value={createProductData.projectID}
                                    onChange={handleChange}
                                    fullWidth sx={{
                                        m: 1,
                                        '& .MuiFormLabel-root.Mui-focused': {
                                            color: '#CD9A2B',
                                        },
                                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#CD9A2B',
                                        },
                                        '& .MuiMenuItem-root': {
                                            color: '#CD9A2B',
                                        },
                                    }}
                                >
                                    {projects.map(project => (
                                        <MenuItem key={project.projectID} value={project.projectID}>
                                            {project.projectName}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Type of Homestay *"
                                    name="productTypeID"
                                    value={createProductData.productTypeID}
                                    onChange={handleChange}
                                    fullWidth sx={{
                                        m: 1,
                                        '& .MuiFormLabel-root.Mui-focused': {
                                            color: '#CD9A2B',
                                        },
                                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#CD9A2B',
                                        },
                                        '& .MuiMenuItem-root': {
                                            color: '#CD9A2B',
                                        },
                                    }}
                                >
                                    {productTypes.map(productType => (
                                        <MenuItem key={productType.productTypeID} value={productType.productTypeID}>
                                            {productType.productTypeName}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className="input-create-product flex-3">
                                <FormControl sx={{ m: 1 }}>
                                    <InputLabel
                                        htmlFor="outlined-adornment-amount"
                                        sx={{
                                            '&.Mui-focused': {
                                                color: '#CD9A2B',
                                            },
                                        }}
                                    >
                                        Area *
                                    </InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        name="productArea"
                                        startAdornment={<InputAdornment position="start">m²</InputAdornment>}
                                        label="Area"
                                        value={createProductData.productArea}
                                        onChange={handleChange}
                                        sx={{
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#CD9A2B',
                                            },
                                        }}
                                        error={errors.productArea}
                                    />
                                    {errors.productArea && <span style={{ color: 'red' }}>{errors.productArea}</span>}
                                </FormControl>
                                <FormControl sx={{ m: 1 }}>
                                    <InputLabel
                                        htmlFor="outlined-adornment-amount"
                                        sx={{
                                            '&.Mui-focused': {
                                                color: '#CD9A2B',
                                            },
                                        }}
                                    >
                                        Price *
                                    </InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        name="productPrice"
                                        startAdornment={<InputAdornment position="start">$/day</InputAdornment>}
                                        label="Price"
                                        value={createProductData.productPrice}
                                        onChange={handleChange}
                                        sx={{
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#CD9A2B',
                                            },
                                        }}
                                        error={errors.productPrice}
                                    />
                                    {errors.productPrice && <span style={{ color: 'red' }}>{errors.productPrice}</span>}
                                </FormControl>
                                <FormControl sx={{ m: 1 }}>
                                    <InputLabel
                                        htmlFor="outlined-adornment-amount"
                                        sx={{
                                            '&.Mui-focused': {
                                                color: '#CD9A2B',
                                            },
                                        }}
                                    >
                                        Available People *
                                    </InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        label="Available People"
                                        name="productPerson"
                                        startAdornment={<InputAdornment position="start"></InputAdornment>}
                                        type="number"
                                        value={createProductData.productPerson}
                                        onChange={handleChange}
                                        sx={{
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#CD9A2B',
                                            },
                                        }}
                                        error={errors.productPerson}
                                    />
                                    {errors.productPerson && <span style={{ color: 'red' }}>{errors.productPerson}</span>}
                                </FormControl>
                            </div>
                            {/* <div className="input-create-product flex-2">
                                <div>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker']}>
                                            <DatePicker
                                                name="availableStartDate"
                                                label="Available start-date *"
                                                value={createProductData.availableStartDate}
                                                onChange={(date) => handleDate(date, 'availableStartDate')}
                                                sx={{
                                                    '& .MuiInputLabel-root.Mui-focused': {
                                                        color: '#CD9A2B',
                                                    },
                                                    '& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#CD9A2B',
                                                    },
                                                }}
                                                error={errors.availableStartDate}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                    {errors.availableStartDate && <span style={{ color: 'red' }}>{errors.availableStartDate}</span>}
                                </div>
                                <div>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker']}>
                                            <DatePicker
                                                name="availableEndDate"
                                                label="Available end-date *"
                                                value={createProductData.availableEndDate}
                                                onChange={(date) => handleDate(date, 'availableEndDate')}
                                                sx={{
                                                    '& .MuiInputLabel-root.Mui-focused': {
                                                        color: '#CD9A2B', // Màu của label khi được focus
                                                    },
                                                    '& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#CD9A2B', // Màu của đường viền khi input được focus
                                                    },
                                                }}
                                                error={errors.availableEndDate}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                    {errors.availableEndDate && <span style={{ color: 'red' }}>{errors.availableEndDate}</span>}
                                </div>
                            </div> */}
                        </div>
                        <div className="create-submit">
                            <div className="input-create-product">
                                Images
                                <form>
                                    <input
                                        type="file"
                                        id="image"
                                        onChange={handleUpload}
                                        multiple
                                        value={imagePreviews.length === 0 ? '' : undefined}
                                        style={{ display: 'none' }}
                                    />
                                    <label htmlFor="image">
                                        <Button
                                            variant="outlined"
                                            component="span"
                                            startIcon={<CloudUploadIcon style={{ color: '#CD9A2B' }} />}
                                            style={{
                                                color: '#CD9A2B',
                                                borderColor: '#CD9A2B',
                                            }}
                                        >
                                            Upload
                                        </Button>
                                    </label>
                                </form>

                            </div>
                            {imagePreviews.map((preview, index) => (
                                <div className="input-container" key={index}>
                                    <img src={preview} alt="Image Preview" />
                                    <button type="button" onClick={() => handleDeselect(index)}>Remove</button>
                                </div>
                            ))}
                        </div>
                        {/* <button className="create-button" type="submit">Create Post</button> */}
                        <button
                            className={`create-button ${isLoading ? 'disabled' : ''}`}
                            // className="create-button"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creating...' : 'Create Post'}
                        </button>

                    </div>
                </form >
                <SnackBar open={snackbarOpen} message={snackbarMessage} onClose={handleSnackbarClose} color={snackbarColor} />
            </div >
        </>
    );
};
