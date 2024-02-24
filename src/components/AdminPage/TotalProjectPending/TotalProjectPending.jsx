import React, { useState, useEffect } from 'react';

import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import { Grid, Card, CardMedia, CardContent, CardActions, CardHeader, Collapse, Avatar, IconButton, Typography, TextField, Pagination, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';




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
    const [expanded, setExpanded] = React.useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [projectPending, setProjectPending] = useState([]);

    useEffect(() => {
        fetchProjecPending();
    }, []);

    const fetchProjecPending = async () => {
        try {
           
            const response = await axios.get('http://localhost:8080/api/products/staff/pending');

            setProjectPending(response.data);
            console.log(response);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handleAcceptClick = async (productId) => {
        console.log(productId);
        try {
            await axios.put(`http://localhost:8080/api/products/staff/active/${productId}`);
            fetchProjecPending();
        } catch (error) {
            console.error('Error accepting project:', error);
        }
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // const filteredProjects = projectPending.filter((project) =>
    //     project.productName.toLowerCase().includes(searchQuery.toLowerCase())
    // );

    // const limitedProjects = filteredProjects.slice(0, 9);

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
                <IconButton type="submit" aria-label="search" sx={{ mb: '20px' }}>
                    <SearchIcon />
                </IconButton>
            </div>
            <Grid container spacing={1} sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', ml: '2' }}>
                {projectPending.map((item) => (
                    <Card key={item.productID} sx={{ maxWidth: 400, ml: '35px', mb: '15px', boxShadow: '3' }}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    {item.productName[1]}
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={item.productName}
                            subheader={`Date: ${item.availableStartDate}`}
                        />
                        <CardMedia
                            component="img"
                            sx={{ width: '400px', height: '266px' }}
                            image={item.productPicture}
                            alt="Project image"
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {item.productDescription}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <Button variant="outlined" sx={{ m: 1 }} onClick={() => handleAcceptClick(item.productID)} >
                                Accept
                            </Button>
                            <Button variant="outlined" color="error">
                                REJECT
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
                                <Typography paragraph>{item.productConvenience}</Typography>
                            </CardContent>
                        </Collapse>
                    </Card>
                ))}
            </Grid>

            <Pagination count={10} color="primary" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: '25px' }} />

        </>
    );
}
