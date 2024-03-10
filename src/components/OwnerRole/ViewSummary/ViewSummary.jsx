import React, { useState, useEffect } from 'react';
import { ProjectsDataSimilar } from '../../../Shared/ListOfProjectSimilar.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react'
import { UserContext } from '../../UserContext.jsx'

export default function ViewSummary() {

    const [products, setProducts] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchProductByUserId = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/products/${user.id}`);
                setProducts(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching products by user id:', error);
            }
        };

        fetchProductByUserId();
    }, [user.id]);

    useEffect(() => {
        const fetchTotalRevenueAPI = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/products/sum/${user.id}`);
                setTotalRevenue(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching total revenue: ', error);
            }
        };

        fetchTotalRevenueAPI();
    }, [user.id]);

    const navigate = useNavigate();

    const handleUpdateButton = (productStatus) => {
        if (productStatus === 'Pending') {
            navigate('update-product');
        } else {
            alert('This timeshare is active and cannot be updated!');
            navigate('/view-summary');
        }
    }

    return (
        <>
            <div className="view-project-container">
                <div className='project-summary'>

                    <h2 className="view-project-title">Summary</h2>
                    <div className="card">

                        <div className="summary-row">
                            <p className="label">Number of projects posted:</p>
                            {/* <p className="value">{totalProjects}</p> */}
                            <p className="value">5</p>
                        </div>
                        <div className="summary-row">
                            <p className="label">Number of projects sold:</p>
                            {/* <p className="value">{projectsSold}</p> */}
                            <p className="value">3</p>
                        </div>
                        <div className="summary-row">
                            <p className="label">Total Revenue:</p>
                            <p className="value">${totalRevenue}</p>
                            {/* <p className="value">228.000.000 Vnđ</p> */}
                        </div>
                    </div>

                </div>
                <div className='list-project'>
                    <h2 className="view-project-title">My Project</h2>
                    {products.map((product) => (
                        <div className="project-card" key={product.productID}>
                            <div className='content-card'>
                                <div className='imgage'>
                                    <img src={product.productPicture} alt={product.productName} />
                                </div>
                                <div className='project-list-details'>
                                    <div className='project-list-title'>
                                        <h3 className='project-list-name'>{product.productName}</h3>
                                        <h3 className='project-list-feedback'><FontAwesomeIcon icon={faStar} color='#FFD43B' />{product.productRating}</h3>
                                    </div>
                                    <h4>Area: {product.productArea}</h4>
                                    <div className='project-list-cost'>
                                        ${product.productPrice} <a>/ night</a>
                                    </div>
                                </div>
                            </div>
                            <div className="button-group">
                                <Link onClick={() => handleUpdateButton(product.productStatus)}>
                                    <FontAwesomeIcon icon={faPen} />
                                    &nbsp;Update
                                </Link>
                                {/* {product.productType === 'pending' ? (
                                    <Link to={'/update-product'}>
                                        <FontAwesomeIcon icon={faPen} />
                                        &nbsp;Update
                                    </Link>
                                ) : (
                                    <div className="disabled-button">
                                        <span>This timeshare is active and cannot be updated.</span>
                                    </div>
                                )} */}
                                <Link to={'/view-summary'}>
                                    <FontAwesomeIcon icon={faTrash} />
                                    &nbsp;Delete
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>


                <div className="pagination">

                </div>
            </div>
        </>
    );
}

