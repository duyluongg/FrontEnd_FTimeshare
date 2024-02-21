import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';



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
    const [projectActive, setProjectActive] = useState([]);

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

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredProjects = projectActive.filter((project) =>
        project.newsTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const limitedProjects = filteredProjects.slice(0, 9);

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
                {limitedProjects.map((item) => (
                    <Card key={item.id} sx={{ maxWidth: 400, ml: '35px', mb: '15px', boxShadow: '3' }}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    {item.newsTitle[1]}
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={item.newsTitle}
                            subheader={`Date: ${item.newsPost}`}
                        />
                        <CardMedia
                            component="img"
                            sx={{ width: '400px', height: '266px' }}
                            image={item.newsPicture}
                            alt="Project image"
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {item.newsTitle}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <Button variant="outlined" sx={{ m: 1 }}>
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
                                <Typography paragraph>{item.newsContent}</Typography>
                            </CardContent>
                        </Collapse>
                    </Card>
                ))}
            </Grid>

      <Pagination count={10} color="primary" sx={{display: 'flex', alignItems:'center', justifyContent: 'center', mt:'25px'}} />

        </>
    );
}
