// // RecipeReviewCard.jsx
// import React, { useState, useEffect } from 'react';
// import { styled } from '@mui/material/styles';
// import { red } from '@mui/material/colors';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import axios from 'axios';
// import { Grid, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Typography, Button, TextField, Pagination } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import ModalProfile from '../ViewReport/ModalProfile';
// import SelectProject from '../../SelectProject';
// const ExpandMore = styled((props) => {
//     const { expand, ...other } = props;
//     return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//     transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//         duration: theme.transitions.duration.shortest,
//     }),
// }));

// export default function TotalProductPending() {
//     const [expanded, setExpanded] = useState(false);
//     const [projectPending, setProjectPending] = useState([]);
//     const [selectedProject, setSelectedProject] = useState(null);
//     const [showCardReport, setShowCardReport] = useState(false);
//     const [currentPage, setCurrentPage] = useState(1);
//     // const [projectsPerPage] = useState(6);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [getProjectID, setGetProjectID] = useState();
//     const projectsPerPage = 6;
//     const indexOfLastProject = currentPage * projectsPerPage;
//     const indexOfFirstProject = indexOfLastProject - projectsPerPage;
//     // const currentProjects = projectPending.slice(indexOfFirstProject, indexOfLastProject);
//     const [images, setImages] = useState([]);
//     const [profiles, setProfiles] = useState([]);
//     const [projectName, setProjectName] = useState([]);
//     const [selectedProjectID, setSelectedProjectID] = useState(null);
//     const [filteredProjects, setFilteredProjects] = useState([]);
//     const token = sessionStorage.getItem('token');
//     console.log(token);
//     const handleSearchChange = (event) => {
//         setSearchQuery(event.target.value);
//     };

//     // useEffect(() => {
//     //     fetchProjectActive();
//     // }, [currentPage]);

//     // const fetchProjectActive = async () => {
//     //     try {
//     //         const response = await axios.get('http://localhost:8080/api/products/staff/active');
//     //         setProjectActive(response.data);
//     //         console.log(response);
//     //     } catch (error) {
//     //         console.error('Error fetching projects:', error);
//     //     }
//     // };

//     useEffect(() => {
//         fetchData(); // Cập nhật dữ liệu sau khi đã chọn dự án mới
//     }, [currentPage, searchQuery, selectedProjectID]);
//     const headers = {headers: {'Authorization': `Bearer ${token}`}};
//     const fetchData = async () => {
//         try {
//             const [pendingResponse, imagesResponse, profilesResponse, projectResponse] = await Promise.all([
//                 axios.get('https://bookinghomestayswp.azurewebsites.net/api/products/staff/pending', headers),
//                 axios.get('https://bookinghomestayswp.azurewebsites.net/api/pictures/customerview', headers),
//                 axios.get('https://bookinghomestayswp.azurewebsites.net/api/users/staffview', headers),
//                 axios.get('https://bookinghomestayswp.azurewebsites.net/api/project/customer/viewproject', headers)

//             ]);

//             setProjectPending(pendingResponse.data);
//             setImages(imagesResponse.data);
//             setProfiles(profilesResponse.data);
//             setProjectName(projectResponse.data);
//             console.log(imagesResponse.data);

//             const productsData = pendingResponse.data;

//             let filteredProductsData = productsData;

//             if (selectedProjectID) {
//                 console.log("ID:", selectedProjectID);
//                 filteredProductsData = productsData.filter(product => product.projectID === selectedProjectID);
//                 console.log(filteredProductsData);
//             }



//             if (searchQuery) {
//                 console.log(searchQuery);
//                 filteredProductsData = filteredProductsData.filter(product =>
//                     product.productName.toLowerCase().includes(searchQuery.toLowerCase())
//                 );
//             }

//             setFilteredProjects(filteredProductsData);

//             // setLoading(false);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//             // setLoading(false);
//         }
//     };

//     const handleExpandClick = () => {
//         setExpanded(!expanded);
//     };

//     const handleReportUserClick = (productId) => {
//         console.log("Report user for productID:", productId);
//         setSelectedProject(productId); // Cập nhật selectedProject trước
//         setShowCardReport(true);
//     };

//     const handleAcceptClick = async (productId) => {
//         console.log(productId);
//         try {
//             await axios.put(`https://bookinghomestayswp.azurewebsites.net/api/products/staff/active/${productId}`, headers);
//             fetchData();
//         } catch (error) {
//             console.error('Error accepting project:', error);
//         }
//     };

//     const handleRejectClick = async (productId) => {
//         console.log(productId);
//         try {
//             await axios.put(`https://bookinghomestayswp.azurewebsites.net/api/products/staff/reject/${productId}`, headers);
//             fetchData();
//         } catch (error) {
//             console.error('Error accepting project:', error);
//         }
//     };

//     useEffect(() => {
//         console.log("Selected Project ID changed:", selectedProject);

//     }, [selectedProject]);


//     const handlePageChange = (event, value) => {
//         setCurrentPage(value);
//     };
//     useEffect(() => {
//         handleGetIDProject();

//     }, [getProjectID])

//     const handleGetIDProject = (getID) => {
//         setGetProjectID(getID);
//         console.log("Selected project ID:", getProjectID);

//     }


//     const formatDate = (dateArray) => {
//         if (!dateArray || !Array.isArray(dateArray) || dateArray.length !== 5) {
//             return ''; 
//         }
//         const [year, month, day] = dateArray.slice(0, 3); // Lấy ba giá trị đầu tiên của mảng
//         return `${day}/${month}/${year}`;
//     };

//     const handleSelectProject = (projectId) => {
//         setSelectedProjectID(projectId);
//         console.log("Selected project ID:", projectId);
//     };

//     return (
//         <>

//             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: "-20px" }}>
//                 <TextField
//                     sx={{ width: '500px', mb: '35px' }}
//                     placeholder="Search..."
//                     variant="outlined"
//                     size="small"
//                     value={searchQuery}
//                     onChange={handleSearchChange}
//                 />
//                 <IconButton type="submit" aria-label="search" sx={{ mb: '30px' }}>
//                     <SearchIcon />
//                 </IconButton>
//                 <SelectProject onSelectProject={handleSelectProject} />

//             </div>

//             <Grid container spacing={1} sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
//                 {filteredProjects.slice(indexOfFirstProject, indexOfLastProject).map((item) => {

//                     const projectImage = images.find(image => image.productID === item.productID);
//                     const userAccount = profiles.find(acc => acc.accID === item.accID);
//                     const projecType = projectName.find(prj => prj.projectID === item.projectID);


//                     return (
//                         <Card key={item.productID} sx={{ maxWidth: 345, mb: '20px', boxShadow: 3, ml: "120px" }}>
//                             <CardHeader
//                                 avatar={
//                                     <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
//                                         <ModalProfile accID={userAccount} />
//                                     </Avatar>
//                                 }
//                                 title={userAccount.accName}
//                             />

//                             <CardMedia
//                                 component="img"
//                                 height="194"
//                                 image={projectImage ? projectImage.imgName : ""}
//                                 alt="Project image"
//                                 sx={{ width: "350px", height: "230px", objectFit: "cover", maxWidth: "100%" }}
//                             />
//                             <CardContent>
//                                 {/* <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}> */}
//                                 <Typography variant="body1" sx={{ fontSize: "20px", fontWeight: "bold", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
//                                     {item.productName}
//                                 </Typography>
//                                 <Typography variant="body1" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: "vertical" }}>
//                                     Project Name: {projecType.projectName}
//                                 </Typography>
//                                 <Typography variant="body1" color="text.secondary">
//                                     Available Start Date: {formatDate(item.availableStartDate)}<br />
//                                     Available End Date: {formatDate(item.availableEndDate)}<br />
//                                 </Typography>
//                                 <Typography variant="body1" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: "vertical" }}>
//                                     Description: {item.productDescription}<br />
//                                 </Typography>
//                                 <Typography variant="body1" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: "vertical" }}>
//                                     Address: {item.productAddress}
//                                 </Typography>
//                                 <Typography variant="body1" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: "vertical" }}>
//                                     Convenience: {item.productConvenience}
//                                 </Typography>
//                                 <Typography variant="body1" color="text.secondary">
//                                     Price: {item.productPrice}
//                                 </Typography>
//                                 <Typography variant="body1" color="text.secondary">
//                                     Person: {item.productPerson}
//                                 </Typography>
//                             </CardContent>
//                             <CardActions disableSpacing>
//                                 <Button variant="outlined" sx={{ m: 1 }} onClick={() => handleAcceptClick(item.productID)} >
//                                     Accept
//                                 </Button>
//                                 <Button variant="outlined" color="error" onClick={() => handleRejectClick(item.productID)}>
//                                     REJECT
//                                 </Button>
//                             </CardActions>
//                         </Card>
//                     );
//                 })}
//             </Grid >
//             {/* <Pagination count={10} color="primary" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: '25px' }} /> */}
//             <Pagination
//                 count={10}
//                 color="primary"
//                 sx={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     mt: '25px',
//                     '& .MuiPaginationItem-root': {
//                         color: '#CD9A2B',
//                     },
//                     position: "sticky",
//                     top: "100%",
//                     bottom: "5px",
//                     left: "0px",
//                     right: "0px",
//                     // marginBottom: "0px"

//                 }}
//                 onChange={handlePageChange}
//             />


//         </>
//     );
// }



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
export default function ProductPendingDetail() {
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
    const apiUrl = 'https://bookinghomestayfpt.azurewebsites.net';

    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    console.log(token);
    const headers = { headers: { 'Authorization': `Bearer ${token}` } };

    const toggleModal = () => {
        setShowModalNotify(!showModalNotify);
    };


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            console.log(accID);
            const [productItem, imagesResponse, profilesResponse, userData, projectResponse] = await Promise.all([
                axios.get(`${apiUrl}/api/products/viewById/${productID}`),
                axios.get(`${apiUrl}/api/pictures/customerview`),
                axios.get(`${apiUrl}/api/users/staffview`),
                axios.get(`${apiUrl}/api/users/viewDetail/${accID}`),
                axios.get(`${apiUrl}/api/project/customer/viewproject`)

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


    const handleAcceptClick = async (productId) => {
        console.log(productId);
        try {
            await axios.put(`${apiUrl}/api/products/staff/active/${productId}`, null, headers);
            setShowModalNotify(true)
            setTimeout(() => navigate("/staff"), 2000)
            fetchData();
        } catch (error) {
            console.error('Error accepting project:', error);
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

                                <ModalAccept  openModalConfirm={() => handleAcceptClick(productID)} />

                                {/* <ModalReject getProductID={productID} openModalConfirm={() => handleRejectClick(productID)} /> */}
                                <ModalReject getProductID={productID}/>
                            </CardActions>

                        </Card>
                    )}
                </div>
            </div>

            <ModalSuccess openModal={showModalNotify} onClose={toggleModal} />



        </>
    )
}
