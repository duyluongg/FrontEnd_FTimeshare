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

export default function ViewAllNew() {
    const [news, setNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 6;
    const [searchQuery, setSearchQuery] = useState('');
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const [filteredProjects, setFilteredProjects] = useState([]);
    const currentNews = searchQuery ? filteredProjects.slice(indexOfFirstProject, indexOfLastProject) : news.slice(indexOfFirstProject, indexOfLastProject);
    const token = sessionStorage.getItem('token');
    console.log(token);
    const headers = { headers: { 'Authorization': `Bearer ${token}` } };
    useEffect(() => {
        fetchAllNews();
    }, [searchQuery]);
    const fetchAllNews = async () => {
        try {
            const newResponse = await axios.get('https://bookinghomestayfpt.azurewebsites.net/api/news/view', headers);

            const sortedNews = newResponse.data.sort((a, b) => {
                const dateA = new Date(...a.newsPost);
                const dateB = new Date(...b.newsPost);
                return dateB - dateA;
            });
            setNews(sortedNews);

            const filtered = sortedNews.filter(item =>
                item.newsTitle.toLowerCase().includes(searchQuery.toLowerCase())
            );

            setFilteredProjects(filtered);

        } catch (error) {
            console.error('Error fetching top news:', error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };


    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };
    return (
        // <div>abc</div>
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
            <Grid container spacing={1} sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {currentNews.map((item) => {
                    return (
                        <Card sx={{ maxWidth: 345, ml: "120px" }} key={item.newsID}>
                            <CardMedia
                                component="img"
                                alt="green iguana"
                                height="140"
                                image={item.imgName}
                                sx={{ width: "350px", height: "350px", objectFit: "cover", maxWidth: "100%" }}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" sx={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden', mb: "20px" }} >
                                    {item.newsTitle}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }} >
                                    {item.newsContent}
                                </Typography>
                            </CardContent>
                            <Link to={`/view-news/${item.newsID}`}>
                                <CardActions>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Link>

                        </Card>
                    )

                })}
            </Grid>

            <Pagination
                count={10}
                color="primary"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: '25px',
                    '& .MuiPaginationItem-root': {
                        color: '#CD9A2B',
                    },
                    position: "sticky",
                    top: "80%",
                    
                    zIndex: 1, 
                }}
                onChange={handlePageChange}
            />

        </>

    );
}
