import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from 'react'
import { UserContext } from '../UserContext.jsx'
import '../Wallet&Reward/Wallet.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

const TotalRevenueHomestay = () => {

    const { user } = useContext(UserContext);
    const [productListByUserId, setProductListByUserId] = useState([]);
    const [totalBalance, setTotalBalance] = useState('');
    const [images, setImages] = useState([]);


    useEffect(() => {
        viewBalance();
    }, [user.id]);
    const viewBalance = async () => {
        try {
            const response = await axios.get(`https://bookinghomstay.azurewebsites.net/api/bookings/staff/TotalOwnerDoneCancelled/${user.id}`);
            console.log(response.data);
            setTotalBalance(response.data);
        } catch (error) {
            console.error('View balance failed', error.response);
        }
    }

    useEffect(() => {
        const fetchProductByUserId = async () => {
            try {
                const response = await axios.get(`https://bookinghomstay.azurewebsites.net/api/products/${user.id}`);
                const products = response.data;

                const updatedProducts = await Promise.all(products.map(async (product) => {
                    const feedbackResponse = await axios.get(`https://bookinghomstay.azurewebsites.net/api/feedback/average-feedback-rating/${product.productID}`);
                    const rating = feedbackResponse.data;

                    const revenueResponse = await axios.get(`https://bookinghomstay.azurewebsites.net/api/products/sumRevenueOfProducts/${product.productID}`);
                    const revenue = revenueResponse.data;
                    // console.log(revenue);

                    return { ...product, rating, revenue };
                }));

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
                const response = await axios.get(`https://bookinghomstay.azurewebsites.net/api/pictures/customerview`);
                setImages(response.data);
            } catch (error) {
                console.error('Error fetching view img:', error);
            }
        };
        fetchImg();
    }, []);


    return (
        <>
            <div className="b0fa906f8d e6e947a3f3 d7c982e3c3 ca940ccdb6">
                <div className="efe2573e07">
                    <div className="bcc6a086d3">
                        <div className="c82435a4b8 c0fdac86a6 a6ae3c2b40 a18aeea94d d794b7a0f7 f53e278e95 ffae958e14 f5ca87a2a1 ebdcef99c3">
                            <div className="db3738faa6">
                                <div className="da948e99a4">
                                    <picture className="e5a3812a75 b7db025f54">
                                        <img className="e3fa9175ee d354f8f44f" src="https://t-cf.bstatic.com/design-assets/assets/v3.109.0/illustrations-traveller/Wallet.png" srcset="https://t-cf.bstatic.com/design-assets/assets/v3.109.0/illustrations-traveller/Wallet@2x.png 2x" alt="" role="presentation" loading="lazy" />
                                    </picture>
                                    <div className="e7a9dabef5">
                                        <div className="ece6399982">
                                            <div>
                                                <div class="af8fbdf136">Wallet balance</div>
                                            </div>
                                            <div class="d80469234a">
                                                <div class="a53cbfa6de f45d8e4c32">Includes all rewards</div>
                                            </div>
                                        </div>
                                        <div className="e402d59492">
                                            <div class="af8fbdf136">$&nbsp;{totalBalance}</div>
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
                        <div className="project-card" key={product.productID}>
                            <div className='content-card'>
                                <div className='imgage'>
                                    {projectImage && <img src={projectImage.imgName} />}
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
                                <Link onClick={() => handleUpdateButton(product.productStatus)}>
                                    <FontAwesomeIcon icon={faPen} />
                                    &nbsp;Update
                                </Link>
                                <Link to={'/view-summary'}>
                                    <FontAwesomeIcon icon={faTrash} />
                                    &nbsp;Delete
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>

            {productListByUserId.map((product) => {
                <div>
                    {product.productName}
                    {product.revenue}
                </div>
            })}
        </>
    );
}

export default TotalRevenueHomestay;