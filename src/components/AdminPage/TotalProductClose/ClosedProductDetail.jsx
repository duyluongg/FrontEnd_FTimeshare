
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
import Button from '@mui/material/Button';
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ModalProfile from '../ViewReport/ModalProfile';
import ModalAccept from '../../ModalAccept';
import ModalReject from '../../ModalReject';
import ModalSuccess from '../../ModalSuccess';
import { useNavigate } from 'react-router-dom';

export default function ClosedProductDetail() {
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
    const [projectType, setProjectType] = useState([]);
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    console.log(token);

    const toggleModal = () => {
        setShowModalNotify(!showModalNotify);
    };


    useEffect(() => {
        fetchData();
    }, []);

    const headers = { headers: { 'Authorization': `Bearer ${token}` } };
    const fetchData = async () => {
        try {
            console.log(accID);
            const [productItem, imagesResponse, profilesResponse, userData, projectResponse] = await Promise.all([
                axios.get(`https://bookinghomestayswp.azurewebsites.net/api/products/viewById/${productID}`, headers),
                axios.get('https://bookinghomestayswp.azurewebsites.net/api/pictures/customerview', headers),
                axios.get('https://bookinghomestayswp.azurewebsites.net/api/users/staffview', headers),
                axios.get(`https://bookinghomestayswp.azurewebsites.net/api/users/viewDetail/${accID}`, headers),
                axios.get('https://bookinghomestayswp.azurewebsites.net/api/project/customer/viewproject', headers)

                // axios.get(`https://bookinghomestayswp.azurewebsites.net/api/reports/viewByProductId/${productID}`, headers)


            ]);

            setprojectDetail(productItem.data);
            console.log(productItem.data);

            setImages(imagesResponse.data);
            console.log(imagesResponse.data);

            setProfiles(profilesResponse.data);

            setUserAccount(userData.data);
            console.log(userData.data);

            setProjectType(projectResponse.data);




        } catch (error) {
            console.error('Error fetching data:', error);

        }
    };

    const projectImage = images.find(image => image.productID === projectDetail[0].productID);


    console.log(projectImage);
    const projectName = projectType.find((prj) => prj.projectID === projectDetail[0].projectID);
    console.log(projectName);
    return (
        <>

            <div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    {projectDetail.length > 0 && (


                        <Card sx={{ maxWidth: 800, ml: "80px" }}>
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
                                {/* <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}> */}
                                <Typography variant="body1" sx={{ fontSize: "20px", fontWeight: "bold", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                    {projectDetail[0].productName}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: "vertical" }}>
                                    Project Name: {projectName.projectName}
                                </Typography>

                                <Typography variant="body1" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: "vertical" }}>
                                    Description: {projectDetail[0].productDescription}<br />
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: "vertical" }}>
                                    Address: {projectDetail[0].productAddress}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: "vertical" }}>
                                    Convenience: {projectDetail[0].productConvenience}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Price: {projectDetail[0].productPrice}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Person: {projectDetail[0].productPerson}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>

                                <Button sx={{ cursor: "default", width: "330px" }} variant="outlined" color="error" onClick={() => handleRejectClick(item.productID)}>
                                    REJECTED
                                </Button>
                            </CardActions>

                        </Card>
                    )}
                </div>
            </div>

            <ModalSuccess openModal={showModalNotify} onClose={toggleModal} />



        </>
    )
}
