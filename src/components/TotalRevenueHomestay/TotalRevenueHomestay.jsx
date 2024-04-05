import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from 'react'
import { UserContext } from '../UserContext.jsx'

const TotalRevenueHomestay = () => {

    const { user } = useContext(UserContext);
    const [productListByUserId, setProductListByUserId] = useState([]);

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

    // useEffect(() => {
    //     const fetchProductByUserId = async () => {
    //         try {
    //             const response = await axios.get(`https://bookinghomestayswp.azurewebsites.net/api/products/${user.id}`);
    //             const products = response.data;
    
    //             const updatedProducts = await Promise.allSettled(products.map(async (product) => {
    //                 try {
    //                     const feedbackResponse = await axios.get(`https://bookinghomestayswp.azurewebsites.net/api/feedback/average-feedback-rating/${product.productID}`);
    //                     const rating = feedbackResponse.data;
    
    //                     const revenueResponse = await axios.get(`https://bookinghomestayswp.azurewebsites.net/api/products/sumRevenueOfProducts/${product.productID}`);
    //                     const revenue = revenueResponse.data;
    
    //                     return { ...product, rating, revenue };
    //                 } catch (error) {
    //                     // Handle individual request errors here
    //                     console.error('Error fetching additional data for product:', error);
    //                     // Return product with default values if error occurs
    //                     return { ...product, rating: 0, revenue: 0 };
    //                 }
    //             }));
    
    //             // Extracting the fulfilled values
    //             const fulfilledProducts = updatedProducts
    //                 .filter(result => result.status === 'fulfilled')
    //                 .map(result => result.value);
    
    //             setProductListByUserId(fulfilledProducts);
    //         } catch (error) {
    //             console.error('Error fetching products by user-id:', error);
    //         }
    //     };
    
    //     fetchProductByUserId();
    // }, [user.id]);
    

    return (
        <>
            {productListByUserId.map((product) => {
                return (
                    <>
                        <div>
                            {product.productName}
                            {product.revenue}
                        </div>
                    </>
                );
            })}
        </>
    );
}

export default TotalRevenueHomestay;