import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';

import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import { Grid, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Typography,Button, TextField, Pagination} from '@mui/material';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
// import Pagination from '@mui/material/Pagination';
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
    const [projectActive, setProjectActive] = React.useState([])
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        fetchProjectPending();
    }, []);

    const fetchProjectPending = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/products/staff/rejected');
            setProjectActive(response.data);
            console.log(response);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

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
                    <Card key={item.newsID} sx={{ maxWidth: 345, mb: '20px', boxShadow: 3 }}>
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
            <Pagination count={10} color="primary" sx={{display: 'flex', alignItems:'center', justifyContent: 'center', mt:'25px'}} />
        </>

    );
}
