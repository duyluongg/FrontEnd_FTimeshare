import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from 'react'
import { UserContext } from '../UserContext.jsx'
import '../Wallet&Reward/Wallet.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'customerName', label: 'Customer', minWidth: 170 },
    { id: 'checkIn', label: 'Check-in', minWidth: 100 },
    {
        id: 'checkOut',
        label: 'Check-out',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'price',
        label: 'Price (VND)',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    // {
    //   id: 'size',
    //   label: 'Size\u00a0(m\u00b2)',
    //   minWidth: 170,
    //   align: 'right',
    //   format: (value) => value.toLocaleString('en-US'),
    // },
    {
        id: 'status',
        label: 'Status',
        minWidth: 170,
        align: 'right',
        // format: (value) => value.toFixed(2),
    },
];

function createData(name, customerName, checkIn, checkOut, price, status) {
    return { name, customerName, checkIn, checkOut, price, status };
}

// const rows = [
//     createData('India', 'IN', 1324171354, 3287263),
//     createData('China', 'CN', 1403500365, 9596961),
//     createData('Italy', 'IT', 60483973, 301340),
//     createData('United States', 'US', 327167434, 9833520),
//     createData('Canada', 'CA', 37602103, 9984670),
//     createData('Australia', 'AU', 25475400, 7692024),
//     createData('Germany', 'DE', 83019200, 357578),
//     createData('Ireland', 'IE', 4857000, 70273),
//     createData('Mexico', 'MX', 126577691, 1972550),
//     createData('Japan', 'JP', 126317000, 377973),
//     createData('France', 'FR', 67022000, 640679),
//     createData('United Kingdom', 'GB', 67545757, 242495),
//     createData('Russia', 'RU', 146793744, 17098246),
//     createData('Nigeria', 'NG', 200962417, 923768),
//     createData('Brazil', 'BR', 210147125, 8515767),
// ];


const TotalRevenueHomestay = () => {
    const apiUrl = 'https://bookinghomestayfpt.azurewebsites.net';
    const { user } = useContext(UserContext);
    const [productListByUserId, setProductListByUserId] = useState([]);
    const [totalBalance, setTotalBalance] = useState('');
    const [images, setImages] = useState([]);
    const [bookingList, setBookingList] = useState(null);
    const [showBookingList, setShowBookingList] = useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const formatDate = (dateArray) => {
        const [year, month, day] = dateArray;
        return `${day}/${month}/${year}`;
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        viewBalance();
    }, [user.id]);
    const viewBalance = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/bookings/staff/TotalOwnerDoneCancelled/${user.id}`);
            console.log(response.data);
            setTotalBalance(response.data);
        } catch (error) {
            console.error('View balance failed', error.response);
        }
    }

    useEffect(() => {
        const fetchProductByUserId = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/products/${user.id}`);
                const products = response.data;
                console.log(products);

                const updatedProducts = await Promise.all(products.map(async (product) => {
                    const feedbackResponse = await axios.get(`${apiUrl}/api/feedback/average-feedback-rating/${product.productID}`);
                    const rating = feedbackResponse.data;

                    const revenueResponse = await axios.get(`${apiUrl}/api/products/sumRevenueOfProducts/${product.productID}`);
                    const revenue = revenueResponse.data;
                    // console.log(revenue);

                    return { ...product, rating, revenue };
                }));
                console.log(updatedProducts);
                setProductListByUserId(updatedProducts);
            } catch (error) {
                console.error('Error fetching products by user-id:', error);
            }
        };
        fetchProductByUserId();
    }, [user.id]);

    useEffect(() => {
        const fetchImg = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/pictures/customerview`);
                setImages(response.data);
            } catch (error) {
                console.error('Error fetching view img:', error);
            }
        };
        fetchImg();
    }, []);

    const handleDivClick = async (productId) => {
        setShowBookingList(prevState => ({
            ...prevState,
            [productId]: !prevState[productId]  // Đảo ngược trạng thái
        }));
        if (!showBookingList[productId]) {
            try {
                const response = await axios.get(`https://bookinghomestayfpt.azurewebsites.net/api/bookings/view-booking-by-product-Id/${productId}`);
                const products = response.data;
                console.log(products)

                const updatedProducts = await Promise.all(products.map(async (product) => {
                    const productDetailResponse = await axios.get(`https://bookinghomestayfpt.azurewebsites.net/api/products/viewById/${product.productID}`);
                    const productDetail = productDetailResponse.data;

                    const accountResponse = await axios.get(`https://bookinghomestayfpt.azurewebsites.net/api/users/viewDetail//${product.productID}`);
                    const accountDetail = accountResponse.data;
                    // console.log(revenue);

                    return { ...product, productDetail, accountDetail };
                }));
                console.log(updatedProducts);
                setBookingList(updatedProducts);
                // setBookingList(response.data);
            } catch (error) {
                // Xử lý lỗi ở đây nếu cần
                console.error('Error fetching data:', error);
                setShowBookingList(prevState => ({
                    ...prevState,
                    [productId]: false
                }));
            }
        }
    };

    // const rows = [];
    // if (bookingList !== null) {
    //     rows.push(
    //         createData(
    //             bookingList.productID,
    //             formatDate(bookingList.startDate),
    //             formatDate(bookingList.endDate),
    //             bookingList.bookingPrice,
    //             bookingList.bookingStatus
    //         )
    //     );
    // }

    const rows = [];
    if (bookingList !== null) {
        for (let i = 0; i < bookingList.length; i++) {
            const booking = bookingList[i];
            const rowData = createData(
                booking.productDetail[0].productName,
                booking.accountDetail.accName,
                formatDate(booking.startDate),
                formatDate(booking.endDate),
                booking.bookingPrice,
                booking.bookingStatus
            );
            rows.push(rowData);
        }
    }



    return (
        <div>
            <div className="b0fa906f8d e6e947a3f3 d7c982e3c3 ca940ccdb6">
                <div className="efe2573e07">
                    <div className="bcc6a086d3">
                        <div className="c82435a4b8 c0fdac86a6 a6ae3c2b40 a18aeea94d d794b7a0f7 f53e278e95 ffae958e14 f5ca87a2a1 ebdcef99c3">
                            <div className="db3738faa6">
                                <div className="da948e99a4">
                                    <picture className="e5a3812a75 b7db025f54">
                                        <img className="e3fa9175ee d354f8f44f" src="https://t-cf.bstatic.com/design-assets/assets/v3.109.0/illustrations-traveller/Wallet.png" srcSet="https://t-cf.bstatic.com/design-assets/assets/v3.109.0/illustrations-traveller/Wallet@2x.png 2x" alt="" role="presentation" loading="lazy" />
                                    </picture>
                                    <div className="e7a9dabef5">
                                        <div className="ece6399982">
                                            <div>
                                                <div className="af8fbdf136">Wallet balance</div>
                                            </div>
                                            <div className="d80469234a">
                                                <div className="a53cbfa6de f45d8e4c32">Includes all rewards</div>
                                            </div>
                                        </div>
                                        <div className="e402d59492">
                                            <div className="af8fbdf136">$&nbsp;{totalBalance}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            <div className='list-project'>
                <h2 className="view-project-title">List of my homestay</h2>
                {productListByUserId.map((product) => {
                    const projectImage = images.find(image => image.productID === product.productID);
                    return (
                        <div key={product.productID} onClick={() => handleDivClick(product.productID)} className="project-card">
                            <div className='content-card'>
                                <div className='imgage'>
                                    {projectImage && <img src={projectImage.imgName} alt={product.productName} />}
                                </div>
                                <div className='project-list-details'>
                                    <div className='project-list-title'>
                                        <h3 className='project-list-name'>{product.productName}</h3>
                                        <h3 className='project-list-feedback'><FontAwesomeIcon icon={faStar} color='#FFD43B' />{product.productRating}</h3>
                                    </div>
                                    <h4>{product.productAddress}</h4>
                                    <h4>Area: {product.productArea}m²</h4>
                                    <div className='project-list-price'>
                                        {product.productPrice} VND <span>/night</span>
                                    </div>
                                    <div className='project-list-cost'>
                                        <span>Total Revenue: </span>${product.revenue} VND
                                    </div>
                                </div>
                            </div>
                            <div className="button-group">
                                {/* <Link onClick={() => handleUpdateButton(product.productStatus)}>
                                    <FontAwesomeIcon icon={faPen} />
                                    &nbsp;Update
                                </Link> */}
                                <Link to={`/update-product/${product.productID}/${user.id}`}>
                                    <FontAwesomeIcon icon={faPen} />
                                    &nbsp;Update
                                </Link>
                                <Link to={'/view-summary'}>
                                    <FontAwesomeIcon icon={faTrash} />
                                    &nbsp;Delete
                                </Link>
                            </div>
                            {showBookingList[product.productID] && (
                                <Paper sx={{ width: '100%' }}>
                                    <TableContainer sx={{ maxHeight: 440 }}>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center" colSpan={5}>
                                                        List of Bookings
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    {columns.map((column) => (
                                                        <TableCell
                                                            key={column.id}
                                                            align={column.align}
                                                            style={{ top: 57, minWidth: column.minWidth }}
                                                        >
                                                            {column.label}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows
                                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    .map((row) => (
                                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                            {columns.map((column) => (
                                                                <TableCell key={column.id} align={column.align}>
                                                                    {column.format && typeof row[column.id] === 'number'
                                                                        ? column.format(row[column.id])
                                                                        : row[column.id]}
                                                                </TableCell>
                                                            ))}
                                                        </TableRow>
                                                    ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[10, 25, 100]}
                                        component="div"
                                        count={rows.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </Paper>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
    

}

export default TotalRevenueHomestay;