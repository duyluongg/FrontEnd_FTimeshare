import React, { useState, useEffect, useCallback } from 'react';
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import './AdminPage/TotalProject/TotalProduct.css'
import { TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export default function AllBooking() {
    const ODD_OPACITY = 0.2;
    const [search, setSearch] = useState('');
    const [projectActive, setProjectActive] = useState([]);
    const token = sessionStorage.getItem('token');
    console.log(token);
    useEffect(() => {
        fetchData(); // Cập nhật dữ liệu sau khi đã chọn dự án mới
    }, []);
    const fetchData = async () => {
        try {
            // Thay thế 'your_token_here' bằng bearer token của bạn

            const [
                waito100Response,
                waito80Response,
                productResponse
            ] = await Promise.all([


                axios.get('https://bookinghomestayswp.azurewebsites.net/api/bookings/staff/WaitRespondPayment(100)', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }),
                axios.get('https://bookinghomestayswp.azurewebsites.net/api/bookings/staff/WaitRespondPayment(80)', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }),
                axios.get('https://bookinghomestayswp.azurewebsites.net/api/products/staff/active', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }),

            ]);
            console.log(waito100Response.data);
            console.log(waito80Response.data);
            console.log(productResponse.data);



            const dataWithId = [
                ...waito100Response.data.map((item, index) => ({
                    ...item,
                    id: index + 1,



                })),
                ...waito80Response.data.map((item, index) => ({
                    ...item,
                    id: index + 1 + waito80Response.data.length,


                })),

            ];

            setProjectActive(dataWithId);
            console.log(dataWithId);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    const getProductName = (productId, product) => {
        console.log(productId);
        console.log(product);
        const project = product.find(prd => prd.productID === productId);
        console.log(project);

        return project ? project.productName : '';

    };


    // const getProductType = (productTypeId, projects) => {
    //     const project = projects.find(project => project.productTypeID === productTypeId);
    //     return project ? project.productTypeName : '';
    // };

    const columns = [
        { field: 'id', headerName: 'No', width: 100, headerClassName: "super-app-theme--header", cellClassName: "super-app-theme--cell-other" },
        { field: 'startDate', headerName: 'Check-in', width: 120, headerClassName: "super-app-theme--header", valueFormatter: (params) => formatDate(params.value), cellClassName: "super-app-theme--cell-other" },
        { field: 'endDate', headerName: 'Check-out', width: 120, headerClassName: "super-app-theme--header", valueFormatter: (params) => formatDate(params.value), cellClassName: "super-app-theme--cell-other" },
        { field: 'createDate', headerName: 'Create date', width: 120, headerClassName: "super-app-theme--header", valueFormatter: (params) => formatDate(params.value), cellClassName: "super-app-theme--cell-other" },
        { field: 'bookingPerson', headerName: 'Person', width: 120, headerClassName: "super-app-theme--header", cellClassName: "super-app-theme--cell-other" },
        { field: 'bookingPrice', headerName: 'Price', width: 120, headerClassName: "super-app-theme--header", cellClassName: "super-app-theme--cell-other" },
        // { field: 'productName', headerName: 'Product', width: 120, headerClassName: "super-app-theme--header", cellClassName: "super-app-theme--cell-other" },
        { field: 'bookingStatus', headerName: 'Status', width: 300, headerClassName: "super-app-theme--header", cellClassName: "super-app-theme--cell-other" },





        // { field: 'availableStartDate', headerName: 'Start Date', width: 130, valueFormatter: (params) => formatDate(params.value), headerClassName: "super-app-theme--header" },
        // { field: 'availableEndDate', headerName: 'End Date', width: 130, valueFormatter: (params) => formatDate(params.value), headerClassName: "super-app-theme--header" },
        {
            field: 'detail',
            headerName: 'Detail',
            width: 100,
            headerClassName: "super-app-theme--header",
            cellClassName: "super-app-theme--cell-other",
            renderCell: (params) => (
                params.row.bookingStatus === "Wait to respond payment (80%)" ? (
                    <Link to={`/staff/wait-customer-to-confirm-payment-list/80/detail/${params.row.bookingID}/${params.row.productID}/${params.row.accID}`}>
                        <Button variant="outlined">
                            DETAIL
                        </Button>
                    </Link>
                ) : (
                    <Link to={`/staff/wait-customer-to-confirm-payment-list/100/detail/${params.row.bookingID}/${params.row.productID}/${params.row.accID}`}>
                        <Button variant="outlined">
                            DETAIL
                        </Button>
                    </Link>
                )
            )
            

        },

    ];

    const formatDate = (dateArray) => {
        const [year, month, day] = dateArray;
        return `${day}/${month}/${year}`;
    };

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