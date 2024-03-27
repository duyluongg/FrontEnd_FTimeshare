
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
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
import Review from '../../Review/Review';
import ModalPopUpReport from './ModalPopUpReport';
import { Grid } from '@mui/material';
import "./CardReportV2.css"
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ModalProfile from './ModalProfile';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import ModalNotify from './ModalNotify';
import ModalConfirm from '../../ModalConfirm';
import { Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';


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

export default function CardReportV2() {
    const [projectDetail, setprojectDetail] = useState([]);
    const [reportDetails, setReportDetails] = useState([]);
    const { productID, accID } = useParams();
    // const [deleted, setDeleted] = useState(false);
    const [expanded, setExpanded] = React.useState(false);
    const [images, setImages] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [userAccount, setUserAccount] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isProjectClosed, setIsProjectClosed] = useState(false);
    const [showModalNotify, setShowModalNotify] = useState(false);
    // const [showModalConfirm, setShowModalConfirm] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const reportPerPage = 4;
    const indexOfLastProject = currentPage * reportPerPage;
    const indexOfFirstProject = indexOfLastProject - reportPerPage;
    const currentProjects = reportDetails.slice(indexOfFirstProject, indexOfLastProject);
    const toggleModal = () => {
        setShowModalNotify(!showModalNotify);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            console.log(accID);
            const [productItem, imagesResponse, profilesResponse, userData, reportData] = await Promise.all([
                axios.get(`http://localhost:8080/api/products/viewById/${productID}`),
                axios.get('http://localhost:8080/api/pictures/customerview'),
                axios.get('http://localhost:8080/api/users/staffview'),
                axios.get(`http://localhost:8080/api/users/viewDetail/${accID}`),
                axios.get(`http://localhost:8080/api/reports/viewByProductId/${productID}`)


            ]);

            setprojectDetail(productItem.data);
            console.log(productItem.data);

            setImages(imagesResponse.data);
            console.log(imagesResponse.data);

            setProfiles(profilesResponse.data);

            setUserAccount(userData.data);
            console.log(userData.data);

            setReportDetails(reportData.data);
            console.log(reportData.data);

        } catch (error) {
            console.error('Error fetching data:', error);

        }
    };

    const handleDelete = async (reportID) => {
        try {
            await axios.delete(`http://localhost:8080/api/reports/delete/${reportID}`);

            // setProjectReport(prevProjectReport => prevProjectReport.filter(item => item.reportID !== reportID));
            // setProjectReport(true);
            fetchData();

        } catch (error) {
            console.error('Error deleting report:', error);
        }
    };

    const navigate = useNavigate();
    const handleCloseProduct = async (productID) => {
        console.log(productID);
        try {
            await axios.put(`http://localhost:8080/api/products/staff/close/${productID}`);
            setIsProjectClosed(true);
            setShowModalConfirm(true);
            setShowModalNotify(true);
            // navigate("/staff/total-product")
        } catch (error) {
            console.error('Error deleting report:', error);
        }
    };

    useEffect(() => {
        if (isProjectClosed) {
            setShowModalNotify(true);
            setTimeout(() => navigate('/staff/total-product'), 2000);
        }
    }, [isProjectClosed]);

  


    const formatDate = (dateArray) => {
        const [year, month, day] = dateArray;
        return `${day}/${month}/${year}`;
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };


    const projectImage = images.find(image => image.productID === projectDetail[0].productID);


    console.log(projectImage);
    return (
        <>
            {isProjectClosed ? null : (
                <div className='flex-report-information'>
                    <div>
                        <div className='card-report-information'>
                            {projectDetail.length > 0 && (


                                <Card sx={{ maxWidth: 350, ml: "80px" }}>
                                    <CardHeader
                                        avatar={
                                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" >
                                                <ModalProfile accID={userAccount} />
                                            </Avatar>
                                        }
                                        title={userAccount.accName}
                                    />
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={projectImage ? projectImage.imgName : ""}
                                        alt='project image'
                                        sx={{ width: "350px", height: "230px", objectFit: "cover", maxWidth: "100%" }}

                                    />
                                    <CardContent>
                                        <Typography variant="body1" sx={{ fontSize: "20px", fontWeight: "bold", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                            {projectDetail[0].productName}
                                        </Typography>
                                        <Typography color={"green"}>
                                            {projectDetail[0].productRating}<FontAwesomeIcon icon={faStar} color='#FFD43B' />
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            Available Start Date: {formatDate(projectDetail[0].availableStartDate)}<br />
                                            Available End Date: {formatDate(projectDetail[0].availableEndDate)}<br />
                                            Description: {projectDetail[0].productDescription}<br />
                                            Convenience: {projectDetail[0].productConvenience} <br />
                                            Area: {projectDetail[0].productConvenience} <br />
                                            Price: {projectDetail[0].productPrice}<br />

                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        {/* <Button variant="outlined" color="error" onClick={() => handleCloseProduct(projectDetail[0].productID)}> */}
                                        <ModalConfirm openModalConfirm={() => handleCloseProduct(projectDetail[0].productID)} />
                                        
                                    </CardActions>

                                </Card>
                            )}
                        </div>
                    </div>

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
                        <Grid container spacing={1} sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', ml: 'auto' }}>

                            {currentProjects.map((item) => {
                                const reportAcc = profiles.find(profile => profile.accID === item.accID);
                                return (
                                    <Card key={item.reportID} sx={{ maxWidth: 345, margin: "20px", boxShadow: 3 }}>
                                        <CardHeader
                                            avatar={
                                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                    {/* {reportAcc ? reportAcc.accName[0] : "Unknown"} */}
                                                    <ModalProfile accID={reportAcc} />
                                                </Avatar>
                                            }

                                            title={reportAcc ? reportAcc.accName : "Unknown"}
                                            subheader={formatDate(item.reportCreateDate)}
                                        />
                                        <Typography variant="body2" color="text.secondary" sx={{ ml: "10px" }}>
                                            {item.reportDetail}
                                        </Typography>
                                        {/* <CardMedia
                                            component="img"
                                            height="194"
                                            image={item.productID && item.productID.projectID.projectPicture}
                                            alt="Project Image"
                                        /> */}
                                        <CardContent>
                                            <Typography variant="body2" color="text.secondary">
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <ModalPopUpReport onDelete={() => handleDelete(item.reportID)} color='error' />
                                            {/* <Button variant="outlined" color='error'>PENDING</Button> */}
                                        </CardActions>
                                    </Card>
                                );
                            })
                            }

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
                                top: "100%",
                                bottom: "5px",
                                left: "0px",
                                right: "0px",
                                // marginBottom: "0px"

                            }}
                            onChange={handlePageChange}
                        />

                    </div>
                </div>
            )}
            <ModalNotify openModal={showModalNotify} onClose={toggleModal} />

        </>
    )
}
