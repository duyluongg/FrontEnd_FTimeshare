import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Grid, Pagination, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function AccommodationDetail() {
    const [products, setProducts] = useState([]);
    const [images, setImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;
    const [searchQuery, setSearchQuery] = useState('');
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const [filteredProducts, setFilteredProducts] = useState([]);
    const currentProducts = searchQuery ? filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct) : products.slice(indexOfFirstProduct, indexOfLastProduct);
    const projectID = parseInt(useParams().projectID);

    // console.log(projectID);

    useEffect(() => {
        fetchProductByProjectID();
    }, [searchQuery]);
    const fetchProductByProjectID = async () => {

        try {
            const response = await axios.get('http://localhost:8080/api/products/staff/active');
            const products = response.data;
            // console.log(products);
            const productData = products.filter(product => product.projectID === projectID);
            // console.log(productData);
            setProducts(productData);

            const filtered = productData.filter(item =>
                item.productName.toLowerCase().includes(searchQuery.toLowerCase())
            );

            setFilteredProducts(filtered);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        const fetchImg = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/api/pictures/customerview`);
            setImages(response.data);
            // console.log(response.data);
          } catch (error) {
            console.error('Error fetching view img:', error);
          }
        };
        fetchImg();
      }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };
    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TextField
                    sx={{ width: '500px', mb: '35px' }}
                    placeholder="Search..."
                    variant="outlined"
                    size="small"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <IconButton type="submit" aria-label="search" sx={{ mb: '30px' }}>
                    <SearchIcon />
                </IconButton>
            </div>
            <Grid container spacing={1} sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', ml: '95px' }}>
                {currentProducts.map((item) => {
                    const projectImage = images.find(image => image.productID === item.productID);
                    return (
                        <Card sx={{ maxWidth: 345 }} key={item.productID}>
                            <CardMedia
                                component="img"
                                alt="green iguana"
                                height="140"
                                image={projectImage && projectImage.imgName}
                                sx={{ width: "350px", height: "350px", objectFit: "cover", maxWidth: "100%" }}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" sx={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden', mb: "20px" }} >
                                    {item.productName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }} >
                                    {item.productDescription}
                                </Typography>
                            </CardContent>
                            <Link to={`/detail/${item.productID}`}>
                                <CardActions>
                                    <Button size="small">View Detail</Button>
                                </CardActions>
                            </Link>

                        </Card>
                    )

                })}
            </Grid>
            <Pagination
                count={10}
                color="primary"
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: '25px', mb: '25px' }}
                onChange={handlePageChange}
            />
        </div>

    );
}

