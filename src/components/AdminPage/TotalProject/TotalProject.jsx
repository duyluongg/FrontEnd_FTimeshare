// RecipeReviewCard.jsx
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import { Grid, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Typography, Button, TextField, Pagination } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import CardReport from '../ViewReport/CardReport';
// import { useHistory } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function RecipeReviewCard() {
    const [expanded, setExpanded] = useState(false);
    const [projectActive, setProjectActive] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null); // State để lưu trữ thông tin của mục được chọn
    const [showCardReport, setShowCardReport] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        fetchProjectActive();
    }, []);

    const fetchProjectActive = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/products/staff/active');
            setProjectActive(response.data);
            console.log(response);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleReportUserClick = (productId) => {
        console.log("Report user for productID:", productId);
        setSelectedProject(productId); // Cập nhật selectedProject trước
        setShowCardReport(true);
    };
    
    useEffect(() => {
        console.log("Selected Project ID changed:", selectedProject);
       
    }, [selectedProject]);
   

    return (
        <>
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

            <Grid container spacing={1} sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', ml: '50px' }}>
                {projectActive.map((item) => (
                    <Card key={item.productID} sx={{ maxWidth: 345, mb: '20px', boxShadow: 3 }}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    {item.productName[1]}
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    {/* <Link to={`/admin/report-project/${item.productID}`}>
                                        <Button variant="contained" onClick={() => handleReportUserClick(item.productID)}>REPORT'S USER</Button>
                                    </Link> */}
                                                <MoreVertIcon />

                                </IconButton>
                            }
                            title={item.productName}
                            subheader={item.availableStartDate}
                        />
                    
                        <CardMedia
                            component="img"
                            height="194"
                            image={item.productPicture}
                            alt="Project image"
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: "vertical" }}>
                                {item.productDescription}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <Button variant="outlined" color="success">
                                {item.productStatus}
                            </Button>
                            <ExpandMore
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </ExpandMore>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph>
                                    {item.productConvenience}
                                </Typography>
                            </CardContent>
                        </Collapse>
                    </Card>
                ))}
            </Grid >
            <Pagination count={10} color="primary" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: '25px' }} />
        
        

        </>
    );
}
