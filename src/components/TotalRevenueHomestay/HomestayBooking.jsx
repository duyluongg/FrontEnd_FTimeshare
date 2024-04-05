import React, { useState, useEffect, useCallback } from 'react';
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import '../AdminPage/TotalProject/TotalProduct.css'
import { TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export default function DataTable() {
    const ODD_OPACITY = 0.2;
    const [projectActive, setProjectActive] = useState([]);
  
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const [
                productResponse,
                projectResponse,
                productTypeResponse,
                pendingResponse,
                closeResponse,
                rejectedResponse,
            ] = await Promise.all([
                axios.get('https://bookinghomestayswp.azurewebsites.net/api/products/staff/active'),
                // axios.get('https://bookinghomestayswp.azurewebsites.net/api/pictures/customerview',headers),
                // axios.get('https://bookinghomestayswp.azurewebsites.net/api/users/staffview'),
                axios.get('https://bookinghomestayswp.azurewebsites.net/api/project/customer/viewproject'),
                axios.get('https://bookinghomestayswp.azurewebsites.net/api/productType/customer/viewproductType'),
                axios.get('https://bookinghomestayswp.azurewebsites.net/api/products/staff/pending'),
                axios.get('https://bookinghomestayswp.azurewebsites.net/api/products/staff/closed'),
                axios.get('https://bookinghomestayswp.azurewebsites.net/api/products/staff/rejected'),
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
        { field: 'productStatus', headerName: 'Status', width: 90, headerClassName: "super-app-theme--header", cellClassName: "super-app-theme--cell" },
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
                ) :params.row.productStatus === "Pending" ? (
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
                    '@media (hover: none)': {
                        backgroundColor: alpha(
                            theme.palette.primary.main,
                            ODD_OPACITY + theme.palette.action.selectedOpacity,
                        ),
                    },
                },
            },
        },
    }));

    return (
        <div style={{ height: 650, width: '91.6%', marginLeft: "93px" }}>

            {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

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
            </div> */}

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
                // rows={projectActive.filter((item) =>
                //     search.trim() === '' ? true : item.productName.toLowerCase().includes(search.toLowerCase())
                // )}
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
            />
        </div>
    );
}