
// import React, { useState, useEffect, useCallback } from 'react';
// import { styled } from '@mui/material/styles';
// import { red } from '@mui/material/colors';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import axios from 'axios';
// import { Grid, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Typography, Button, TextField, Pagination } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import { Link } from 'react-router-dom';
// import SelectProject from '../../SelectProject';
// import CardReport from '../ViewReport/CardReport';
// // import { useHistory } from 'react-router-dom';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { format } from 'date-fns';
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

// export default function TotalProduct() {
//     const [expanded, setExpanded] = useState(false);
//     const [projectActive, setProjectActive] = useState([]);
//     const [selectedProject, setSelectedProject] = useState(null);
//     const [showCardReport, setShowCardReport] = useState(false);
//     const [currentPage, setCurrentPage] = useState(1);
//     // const [projectsPerPage] = useState(6);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [getProjectID, setGetProjectID] = useState();
//     const projectsPerPage = 2;
//     const indexOfLastProject = currentPage * projectsPerPage;
//     const indexOfFirstProject = indexOfLastProject - projectsPerPage;
//     const [images, setImages] = useState([]);
//     const [profiles, setProfiles] = useState([]);
//     // const currentProjects = searchQuery ? filteredProjects.slice(indexOfFirstProject, indexOfLastProject) : projectActive.slice(indexOfFirstProject, indexOfLastProject);
//     const [filteredProjects, setFilteredProjects] = useState([]);
//     const [projectName, setProjectName] = useState([]);
//     const [selectedProjectID, setSelectedProjectID] = useState(null);

//     const handleSearchChange = (event) => {
//         setSearchQuery(event.target.value);
//     };

//     useEffect(() => {
//         fetchData(); // Cập nhật dữ liệu sau khi đã chọn dự án mới
//     }, [currentPage, searchQuery, selectedProjectID]);
//     const fetchData = async () => {
//         try {
//             const [pendingResponse, imagesResponse, profilesResponse, projectResponse] = await Promise.all([
//                 axios.get('http://localhost:8080/api/products/staff/active'),
//                 axios.get('http://localhost:8080/api/pictures/customerview'),
//                 axios.get('http://localhost:8080/api/users/staffview'),
//                 axios.get('http://localhost:8080/api/project/customer/viewproject')
//             ]);

//             setProjectActive(pendingResponse.data);
//             setImages(imagesResponse.data);
//             setProfiles(profilesResponse.data);
//             setProjectName(projectResponse.data);
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

//             // const filtered = pendingResponse.data.filter(item =>
//             //     item.productName.toLowerCase().includes(searchQuery.toLowerCase())
//             // );
//             // setFilteredProjects(filtered);


//         } catch (error) {
//             console.error('Error fetching data:', error);

//         }
//     };

//     const formatDate = (dateArray) => {
//         const [year, month, day] = dateArray;
//         return `${day}/${month}/${year}`;
//     };

//     const handleExpandClick = () => {
//         setExpanded(!expanded);
//     };

//     const handleReportUserClick = (productId) => {
//         console.log("Report user for productID:", productId);
//         setSelectedProject(productId); // Cập nhật selectedProject trước
//         setShowCardReport(true);
//     };

//     // useEffect(() => {
//     //     console.log("Selected Project ID changed:", selectedProject);

//     // }, [selectedProject]);


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
//                     // const profileAccount = profiles.find(profile => profile.accID === item.accID);
//                     const projecType = projectName.find(prj => prj.projectID === item.projectID);
//                     console.log(projectImage);
//                     return (
//                         <Card key={item.productID} sx={{ maxWidth: 345, mb: '20px', boxShadow: 3, ml: "120px" }}>

//                             <CardHeader

//                                 title={item.productName}

//                                 sx={{ height: "55px", color: "black", backgroundColor: "white", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}

//                             />

//                             <CardMedia
//                                 component="img"
//                                 height="194"
//                                 image={projectImage ? projectImage.imgName : ""}
//                                 alt="Project image"
//                                 sx={{ width: "350px", height: "350px", objectFit: "cover", maxWidth: "100%" }}
//                             />
//                             <CardContent>
//                                 <Typography variant="body2" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: "vertical" }}>
//                                     {item.productAddress}
//                                 </Typography>

//                                 <Typography variant="body1" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: "vertical" }}>
//                                     Project Name: {projecType.projectName}
//                                 </Typography>
//                             </CardContent>
//                             <CardActions disableSpacing>
//                                 <Button variant="outlined" color="success" sx={{ cursor: "default" }}>
//                                     {item.productStatus}
//                                 </Button>
//                                 <Link to={`/staff/report-projectid/${item.productID}/${item.accID}`}>
//                                     <Button variant="outlined" onClick={() => handleGetIDProject(item.productID)}>
//                                         DETAIL
//                                     </Button>
//                                 </Link>
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
//                         color: '#CD9A2B', // Đặt màu của nút trang khi không được chọn
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
import React, { useState, useEffect, useCallback } from 'react';
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import './TotalProduct.css'
import { TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export default function TotalProduct() {
    const ODD_OPACITY = 0.2;
    const [search, setSearch] = useState('');
    const [projectActive, setProjectActive] = useState([]);
    const apiUrl = 'https://bookinghomestayfpt.azurewebsites.net';

    useEffect(() => {
        fetchData(); // Cập nhật dữ liệu sau khi đã chọn dự án mới
    }, []);
    const fetchData = async () => {
        try {
            // Thay thế 'your_token_here' bằng bearer token của bạn

            const [
                productResponse,
                projectResponse,
                productTypeResponse,
                pendingResponse,
                closeResponse,
                rejectedResponse,
            ] = await Promise.all([
                axios.get(`${apiUrl}/api/products/staff/active`),
                // axios.get('https://bookinghomestayswp.azurewebsites.net/api/pictures/customerview',headers),
                // axios.get('https://bookinghomestayswp.azurewebsites.net/api/users/staffview'),
                axios.get(`${apiUrl}/api/project/customer/viewproject`),
                axios.get(`${apiUrl}/api/productType/customer/viewproductType`),
                axios.get(`${apiUrl}/api/products/staff/pending`),
                axios.get(`${apiUrl}/api/products/staff/closed`),
                axios.get(`${apiUrl}/api/products/staff/rejected`),
            ]);

            const dataWithId = [
                ...productResponse.data.map((item, index) => ({
                    ...item,
                    id: index + 1,
                    projectName: getProjectName(item.projectID, projectResponse.data),
                    productType: getProductType(item.productTypeID, productTypeResponse.data),
                    status: "Active"
                })),
                ...pendingResponse.data.map((item, index) => ({
                    ...item,
                    id: index + 1 + productResponse.data.length,
                    projectName: getProjectName(item.projectID, projectResponse.data),
                    productType: getProductType(item.productTypeID, productTypeResponse.data),
                    status: "Pending"
                })),
                ...closeResponse.data.map((item, index) => ({
                    ...item,
                    id: index + 1 + productResponse.data.length + pendingResponse.data.length,
                    projectName: getProjectName(item.projectID, projectResponse.data),
                    productType: getProductType(item.productTypeID, productTypeResponse.data),
                    status: "Close"
                })),
                ...rejectedResponse.data.map((item, index) => ({
                    ...item,
                    id: index + 1 + productResponse.data.length + pendingResponse.data.length + closeResponse.data.length,
                    projectName: getProjectName(item.projectID, projectResponse.data),
                    productType: getProductType(item.productTypeID, productTypeResponse.data),
                    status: "Close"
                }))
            ];

            setProjectActive(dataWithId);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    const getProjectName = (projectId, projects) => {
        const project = projects.find(project => project.projectID === projectId);
        return project ? project.projectName : '';
    };

    const getProductType = (productTypeId, projects) => {
        const project = projects.find(project => project.productTypeID === productTypeId);
        return project ? project.productTypeName : '';
    };

    const columns = [
        { field: 'id', headerName: 'No', width: 100, headerClassName: "super-app-theme--header", cellClassName: "super-app-theme--cell-other" },
        { field: 'productName', headerName: 'Product Name', width: 300, headerClassName: "super-app-theme--header", cellClassName: "super-app-theme--cell-other" },
        { field: 'productAddress', headerName: 'Address', width: 300, headerClassName: "super-app-theme--header" },
        {
            field: 'productStatus',
            headerName: 'Status',
            width: 90,
            headerClassName: "super-app-theme--header",
            cellClassName: (params) => {
                if (params.value === "Pending") {
                    return "super-app-theme--cell-pending";
                } else if (params.value === "Closed") {
                    return "super-app-theme--cell-closed";
                } else if (params.value === "Rejected") {
                    return "super-app-theme--cell-rejected";
                } else {
                    return "super-app-theme--cell";
                }
            }
        },
        { field: 'projectName', headerName: 'Project', width: 300, headerClassName: "super-app-theme--header", cellClassName: "super-app-theme--cell-other" },
        { field: 'productType', headerName: 'Product Type', width: 200, headerClassName: "super-app-theme--header", cellClassName: "super-app-theme--cell-other" },

        // { field: 'availableStartDate', headerName: 'Start Date', width: 130, valueFormatter: (params) => formatDate(params.value), headerClassName: "super-app-theme--header" },
        // { field: 'availableEndDate', headerName: 'End Date', width: 130, valueFormatter: (params) => formatDate(params.value), headerClassName: "super-app-theme--header" },
        {
            field: 'detail',
            headerName: 'Detail',
            width: 100,
            headerClassName: "super-app-theme--header",
            cellClassName: "super-app-theme--cell-other",
            renderCell: (params) => (
                params.row.productStatus === "Closed" ? (
                    <Link to={`/staff/closed/${params.row.productID}/${params.row.accID}`}>
                        <Button variant="outlined">
                            DETAIL
                        </Button>
                    </Link>
                ) : params.row.productStatus === "Pending" ? (
                    <Link to={`/staff/pending/${params.row.productID}/${params.row.accID}`}>
                        <Button variant="outlined">
                            DETAIL
                        </Button>
                    </Link>
                ) : params.row.productStatus === "Rejected" ? (
                    <Link to={`/staff/rejected/${params.row.productID}/${params.row.accID}`}>
                        <Button variant="outlined">
                            DETAIL
                        </Button>
                    </Link>
                ) : (
                    <Link to={`/staff/report-projectid/${params.row.productID}/${params.row.accID}`}>
                        <Button variant="outlined">
                            DETAIL
                        </Button>
                    </Link>
                )
            )

        },

    ];

    // const formatDate = (dateArray) => {
    //     const [year, month, day] = dateArray;
    //     return `${day}/${month}/${year}`;
    // };

    // const formatDate = (dateArray) => {
    //     if (!dateArray || !Array.isArray(dateArray) || dateArray.length !== 5) {
    //         return ''; 
    //     }
    //     const [year, month, day] = dateArray.slice(0, 3); // Lấy ba giá trị đầu tiên của mảng
    //     return `${day}/${month}/${year}`;
    // };
    const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
        [`& .${gridClasses.row}.even`]: {
            backgroundColor: theme.palette.grey[200],
            '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
                '@media (hover: none)': {
                    backgroundColor: 'transparent',
                },
            },
            '&.Mui-selected': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    ODD_OPACITY + theme.palette.action.selectedOpacity,
                ),
                '&:hover': {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        ODD_OPACITY +
                        theme.palette.action.selectedOpacity +
                        theme.palette.action.hoverOpacity,
                    ),
                    // Reset on touch devices, it doesn't add specificity
                    '@media (hover: none)': {
                        backgroundColor: alpha(
                            theme.palette.primary.main,
                            ODD_OPACITY + theme.palette.action.selectedOpacity,
                        ),
                    },
                },
            },
        },
        // Custom styling for rows with status "Pending"
        '& .super-app-theme--cell-pending': {
            color: '#FFC94A', // Set the color to yellow for rows with status "Pending"
            fontSize: "16px",
        },
        '& .super-app-theme--cell-closed': {
            color: 'red', // Set the color to yellow for rows with status "Pending"
            fontSize: "16px",
        },
        '& .super-app-theme--cell-rejected': {
            color: '#561C24', // Set the color to yellow for rows with status "Pending"
            fontSize: "16px",
        },
    }));


    return (
        <div style={{ height: 650, width: '91.6%', marginLeft: "93px" }}>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                <TextField sx={{ width: '500px', mb: '35px' }}
                    placeholder="Search..."
                    variant="outlined"
                    size="small"
                    defaultValue=""
                    onChange={(s) => setSearch(s.target.value)}
                />
                <IconButton type="submit" aria-label="search" sx={{ mb: '30px' }}>
                    <SearchIcon />
                </IconButton>
            </div>

            <StripedDataGrid
                sx={{

                    '& .super-app-theme--header': {
                        backgroundColor: 'gray',
                        color: 'white',
                        fontSize: "18px"

                    },

                    '& .super-app-theme--cell': {
                        color: 'green',
                        fontSize: "16px"

                    },
                    '& .super-app-theme--cell-other': {
                        fontSize: "16px"

                    },
                }}
                rows={projectActive.filter((item) =>
                    search.trim() === '' ? true : item.productName.toLowerCase().includes(search.toLowerCase())
                )}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                }
                pageSizeOptions={[10, 30]}
            // checkboxSelection
            />
        </div>
    );
}

