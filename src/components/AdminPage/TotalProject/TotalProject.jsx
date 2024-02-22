import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { ExpandMoreIcon, MoreVertIcon, SearchIcon } from '@mui/icons-material/ExpandMore';

import {
    Grid, styled, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton,
    Typography, red, Button, TextField, Pagination
} from '@mui/material';

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
        fetchProjectActive();
    }, []);

    const fetchProjectActive = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/news/view');
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
                                    {item.newsTitle[0]}
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={item.newsTitle}
                            subheader={item.newsPost}
                        />
                        <CardMedia
                            component="img"
                            height="194"
                            image={item.newsPicture}
                            alt="Project image"
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: "vertical" }}>
                                {item.newsContent}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <Button variant="contained" color="success">
                                ACTIVE
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
                                <Typography paragraph>Method:</Typography>
                                <Typography paragraph>
                                    {item.newsContent}
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
