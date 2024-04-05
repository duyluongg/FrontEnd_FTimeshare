import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Homestay.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

export default function Homestay() {

    const [city, setCity] = useState('All');
    const [numberOfPerson, setNumberOfPerson] = useState(0);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [filterProduct, setFilterProduct] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [searchClicked, setSearchClicked] = useState(false);
    const [cityList, setCityList] = useState([]);
    const [images, setImages] = useState([]);
    const apiUrl = 'https://bookinghomestayfpt.azurewebsites.net';

    useEffect(() => {
        showProduct();
        showLocation();
        fetchImg();
    }, []);

    const showLocation = async () => {
        try {
            const locationResponse = await axios.get('https://vapi.vnappmob.com/api/province/');
            setCityList(locationResponse.data.results);
        } catch (error) {
            console.error('Show location', error.response);
        }
    }

    // const showProduct = async () => {
    //     try {
    //         const formData = new FormData();
    //         formData.append('cityInAddress', "All");
    //         formData.append('numberOfPerson', 0);
    //         formData.append('startDate', null);
    //         formData.append('endDate', null);

    //         const response = await axios.post('http://localhost:8080/api/products/filter', formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         });
    //         console.log(response.data);
    //         setAllProducts(response.data);
    //     } catch (error) {
    //         console.error('Filter product failed', error.response);
    //     }
    // }

    const showProduct = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/products/staff/active`);
            const activeProducts = response.data;
            const updatedProjects = await Promise.all(activeProducts.map(async (product) => {
                const feedbackResponse = await axios.get(`${apiUrl}/api/feedback/average-feedback-rating/${product.productID}`);
                const rating = feedbackResponse.data;
                return { ...product, rating };
            }));
            updatedProjects.sort((a, b) => b.rating - a.rating);

            setAllProducts(updatedProjects);
        } catch (error) {
            console.error('Filter product failed', error.response);
        }
    }

    const handleFilter = async (e) => {
        e.preventDefault();
        setSearchClicked(true);
        try {

            let formattedStartDate = null;
            let formattedEndDate = null;

            if (startDate && endDate) {
                const startDateObj = new Date(startDate);
                const endDateObj = new Date(endDate);
                formattedStartDate = format(startDateObj, "yyyy-MM-dd'T'HH:mm:ss");
                formattedEndDate = format(endDateObj, "yyyy-MM-dd'T'HH:mm:ss");
            }

            console.log(city);
            console.log(numberOfPerson);
            console.log(formattedStartDate);

            const cityInAddress = city === 'All' ? 'All' : city.province_name;
            const formData = new FormData();
            formData.append('cityInAddress', cityInAddress);
            formData.append('numberOfPerson', numberOfPerson);
            formData.append('startDate', formattedStartDate);
            formData.append('endDate', formattedEndDate);
            console.log(formData);

            const response = await axios.post('${apiUrl}/api/products/filter', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const filteredProducts = response.data;
            const updatedProjects = await Promise.all(filteredProducts.map(async (product) => {
                const feedbackResponse = await axios.get(`${apiUrl}/api/feedback/average-feedback-rating/${product.productID}`);
                const rating = feedbackResponse.data;
                return { ...product, rating };
            }));
            updatedProjects.sort((a, b) => b.rating - a.rating);

            setFilterProduct(updatedProjects);
        } catch (error) {
            console.error('Filter product failed', error.response);
        }
    }

    const fetchImg = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/pictures/customerview`);
            setImages(response.data);
        } catch (error) {
            console.error('Error fetching view img:', error);
        }
    }


    return (
        <>
            <div className='homestay-container'>
                <div className='f29a6defed'>
                    <form className='filter-form' onSubmit={handleFilter}>
                        <div data-testid="searchbox-layout-wide" className='ffb9c3d6a3 c9a7790c31 e691439f9a'>
                            <div className='e22b782521'>
                                <div className='b7ab62d599'>
                                    <div className='c3ffd29f4e bc4cc43c81'>
                                        <div className='a53cbfa6de ac9267e216 a20293ec70 d974f7747b'>
                                            <div className='b9b84f4305'>
                                                <div className='e000754250'>
                                                    <div className='eac0b6e5ba'>
                                                        <span className="fcd9eec8fb d24fc26e73 c696a7d242" aria-hidden="true">
                                                            <FontAwesomeIcon className="fcd9eec8fb-icon" icon={faLocationDot} />
                                                        </span>
                                                    </div>
                                                    {/* <select
                                                        name='city'
                                                        className='eb46370fe1'
                                                        autoComplete='off'
                                                        aria-expanded='false'
                                                        value={city}
                                                        onChange={(e) => setCity(e.target.value)}
                                                    >
                                                        <option value="All">All</option>
                                                        <option value="Thu Duc">Thu Duc</option>
                                                        <option value="Los Angeles">Los Angeles</option>
                                                        <option value="Chicago">Chicago</option>
                                                    </select> */}
                                                    <select
                                                        name='city'
                                                        className='eb46370fe1'
                                                        autoComplete='off'
                                                        aria-expanded='false'
                                                        value={city ? city.province_id : ''}
                                                        onChange={(e) => {
                                                            const selectedProvinceId = e.target.value;
                                                            const selectedProvinceObj = cityList.find(province => province.province_id === selectedProvinceId); // Tìm đối tượng tỉnh/thành phố dựa trên ID
                                                            setCity(selectedProvinceObj || 'All'); // Cập nhật selectedProvince thành đối tượng tìm thấy
                                                        }}
                                                    >
                                                        <option value="All">All</option>
                                                        {cityList.map(province => (
                                                            <option key={province.province_id} value={province.province_id}>
                                                                {province.province_name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <div class="e7e5251f68 c96fa981fd"></div>
                                                    <div class="eac0b6e5ba">
                                                        <span data-testid="input-clear" class="fcd9eec8fb bf9a32efa5" aria-hidden="true">
                                                            <FontAwesomeIcon icon={faXmark} />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="acf75b5882"></div>
                                    </div>
                                </div>
                            </div>
                            <div className='e22b782521'>
                                <div tabindex="-1" className='a1139161bf'>
                                    <div className='f73e6603bf'>
                                        <span className='fcd9eec8fb e93f4f9263 c2cc050fb8 c696a7d242'>
                                            <FontAwesomeIcon className='filter-icon' icon={faCalendarDays} />
                                        </span>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            placeholderText="Start Date"
                                            className="ebbedaf8ac ab26a5d2bd e33c97ff6b"
                                            dateFormat="dd/MM/yyyy"
                                            minDate={new Date()}
                                        />
                                        <span className="ac2e4f2389"> — </span>
                                        <DatePicker
                                            selected={endDate}
                                            onChange={(date) => setEndDate(date)}
                                            minDate={startDate ? new Date(startDate.getTime() + 86400000) : null}
                                            placeholderText="End Date"
                                            className="ebbedaf8ac ab26a5d2bd e33c97ff6b"
                                            dateFormat="dd/MM/yyyy"
                                            disabled={!startDate}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='e22b782521'>
                                <div tabindex="-1" className='d777d2b248'>
                                    <button aria-expanded="false" type="button" className='a83ed08757 ebbedaf8ac ada2387af8'>
                                        <span className='a8887b152e'>
                                            <span className="fcd9eec8fb a6a399739a c2cc050fb8 c696a7d242" aria-hidden="true">
                                                <FontAwesomeIcon className='filter-icon' icon={faUser} />
                                            </span>
                                        </span>
                                        <input
                                            className='a83ed08757 ebbedaf8ac ada2387af8 input-filter-outline'
                                            type="number"
                                            value={numberOfPerson}
                                            onChange={(e) => setNumberOfPerson(e.target.value)}
                                            aria-label="Number of People"
                                        />
                                    </button>
                                </div>
                            </div>
                            <div className='e22b782521 d12ff5f5bf'>
                                <button type="submit" className="a83ed08757 c21c56c305 a4c1805887 f671049264 d2529514af c082d89982 cceeb8986b">
                                    <span className="e4adce92df">Search</span>
                                </button>
                            </div>
                        </div>
                    </form >
                </div >

                <div className='af5895d4b2'>
                    <div className='df7e6ba27d'>
                        <div className='b4b4b2787f'>
                            <div className='ffb9c3d6a3 b700d81135 f7d4209a37'>
                                <div class="f2cf178bcd f3595f8de5">
                                    <h2 class="e1eebb6a1e e6208ee469 d0caee4251">Filter by:</h2>
                                </div>
                                <div className='ffb9c3d6a3 f85e2160d2'>
                                    <h3 class="a3332d346a e6208ee469 d0caee4251">Type</h3>
                                </div>
                                <div className='c733693b78'></div>
                                <div className='a53cbfa6de ac9267e216 d8eb520c4e ebc3dd5b38 bae4cd9be8'>
                                    <input id=":r8hm:" className="f0b6754c38" type="checkbox" />
                                    <label for=":r8hm:" className="c624d7469d f034cf5568-nowrap a937b09340 a3214e5942 bd597ff2d8">
                                        <span className="ff5328eb35"></span>
                                        <span className="ef785aa7f4">
                                            <span className="fcd9eec8fb b27b51da7f bf9a32efa5" aria-hidden="true">
                                                <FontAwesomeIcon className='fcd9eec8fb-icon' icon={faCheck} />
                                            </span>
                                        </span>
                                        <span className="dc5041d860 c72df67c95">
                                            <div className="a53cbfa6de e6208ee469">
                                                <div className="fa7ed6270d" aria-hidden="true">
                                                    <div className="a53cbfa6de e7c28a2436">Hồ bơi</div>
                                                    {/* <span className="abf093bdfe c15ddc3c96">17</span> */}
                                                </div>
                                            </div>
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='bcbf33c5c3'>
                            {/* <div class="efdb2b543b e4b7a69a57">
                                <h1 aria-live="assertive" className="f6431b446c d5f78961c3">17 properties found</h1>
                            </div> */}
                            {searchClicked ? (
                                filterProduct.map((product) => {
                                    const projectImage = images.find(image => image.productID === product.productID);
                                    return (
                                        <div className='dcf496a7b9 bb2746aad9' key={product.productID}>
                                            <div className="c733693b78"></div>
                                            <div className='d4924c9e74'>
                                                <div className='df91032a39'></div>
                                            </div>
                                            <div class="bea018f16c"><div></div></div>
                                            <div className='c82435a4b8 a178069f51 a6ae3c2b40 a18aeea94d d794b7a0f7 f53e278e95 c6710787a4 bbefc5a07c'>
                                                <div className='c066246e13'>
                                                    <div className='a5922b8ca1'>
                                                        <div className='e952b01718'>
                                                            <a href="#" tabindex="-1" aria-hidden="true">
                                                                {projectImage && <img src={projectImage.imgName} />}
                                                                {/* <img src="https://cf.bstatic.com/xdata/images/hotel/square200/239846786.webp?k=c6fd7abbdd9cbef9f2287507867702b74b372ebf0b5c20884315ac34f8c2f696&amp;o=" alt="Seahorse Tropical Da Nang Hotel by Haviland" width="200" height="200" className="f9671d49b1" /> */}
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className='c1edfbabcb'>
                                                        <div className='c624d7469d a0e60936ad a3214e5942 b0db0e8ada'>
                                                            <div className='c624d7469d f034cf5568-nowrap a937b09340 a3214e5942 f02fdbd759'>
                                                                <div className='dc5041d860 c72df67c95'>
                                                                    <div className='c624d7469d a0e60936ad a3214e5942'>
                                                                        <div>
                                                                            <div className='d6767e681c'>
                                                                                <h3 className='aab71f8e4e'>
                                                                                    <a key={product.productID} href='#' className='a78ca197d0'>
                                                                                        <div className="f6431b446c a15b38c233">{product.productName}</div>
                                                                                    </a>
                                                                                </h3>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <div className='abf093bdfe ecc6a9ed89'>
                                                                                <span class="aee5343fdb">
                                                                                    <span class="f419a93f12">
                                                                                        <span aria-expanded="false">{product.productAddress}</span>
                                                                                    </span>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <div className='abf093bdfe ecc6a9ed89'>
                                                                                <span class="aee5343fdb">
                                                                                    <span class="f419a93f12">
                                                                                        <span aria-expanded="false">{product.productDescription}</span>
                                                                                    </span>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <span className="f419a93f12">
                                                                                <span aria-expanded="false">
                                                                                    <span className="fcd9eec8fb f798be919c bf9a32efa5" aria-hidden="true">

                                                                                    </span>
                                                                                    <span className="abf093bdfe b058f54b9a">{product.productArea}m²</span>
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className='c624d7469d a0e60936ad a3214e5942 a0ff1335a1'>
                                                                        <div className='c624d7469d a0e60936ad a3214e5942'>
                                                                            <a href="" className='a83ed08757 f88a5204c2 c057617e1a b98133fb50'>
                                                                                <h3 className='project-list-feedback'>{product.rating}&nbsp;<FontAwesomeIcon icon={faStar} color='#FFD43B' /></h3>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='b1037148f8'>
                                                                <div className='c19beea015'>
                                                                    <div className='ccdd44706b'>
                                                                        <div className='c59cd18527'>
                                                                            <h4 tabindex="0" class="abf093bdfe e8f7c070a7">{product.productConvenience}</h4>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='a4b53081e1'>
                                                                    <div className='c624d7469d a0e60936ad a3214e5942 fdccaff19b'>
                                                                        <div className='c5ca594cb1 f19ed67e4b'>
                                                                            <div className='abf093bdfe f45d8e4c32'>{product.productPerson} People</div>
                                                                            <div className='project-list-cost'>${product.productPrice}<a>/night</a></div>
                                                                            <div className="abf093bdfe f45d8e4c32">Taxes and fees included</div>
                                                                        </div>
                                                                        <div className="da8b337763">
                                                                            <Link to={`/detail/${product.productID}`} className="a83ed08757 c21c56c305 a4c1805887 d691166b09 ab98298258 deab83296e c082d89982 c082d89982-before ff33faec5f">
                                                                                <span className="e4adce92df-button">See Availability</span>
                                                                                <span className="eedba9e88a d7eef963fa">
                                                                                    <span classNam="fcd9eec8fb bf9a32efa5">
                                                                                        <span className="fcd9eec8fb bf9a32efa5" aria-hidden="true">
                                                                                            <FontAwesomeIcon className='fcd9eec8fb-icon' icon={faAngleRight} />
                                                                                        </span>
                                                                                    </span>
                                                                                </span>
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                allProducts.map((product) => {
                                    const projectImage = images.find(image => image.productID === product.productID);
                                    return (
                                        <div className='dcf496a7b9 bb2746aad9' key={product.productID}>
                                            <div className="c733693b78"></div>
                                            <div className='d4924c9e74'>
                                                <div className='df91032a39'></div>
                                            </div>
                                            <div class="bea018f16c"><div></div></div>
                                            <div className='c82435a4b8 a178069f51 a6ae3c2b40 a18aeea94d d794b7a0f7 f53e278e95 c6710787a4 bbefc5a07c'>
                                                <div className='c066246e13'>
                                                    <div className='a5922b8ca1'>
                                                        <div className='e952b01718'>
                                                            <a href="#" tabindex="-1" aria-hidden="true">
                                                                {projectImage && <img src={projectImage.imgName} />}
                                                                {/* <img src="https://cf.bstatic.com/xdata/images/hotel/square200/239846786.webp?k=c6fd7abbdd9cbef9f2287507867702b74b372ebf0b5c20884315ac34f8c2f696&amp;o=" alt="Seahorse Tropical Da Nang Hotel by Haviland" width="200" height="200" className="f9671d49b1" /> */}
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className='c1edfbabcb'>
                                                        <div className='c624d7469d a0e60936ad a3214e5942 b0db0e8ada'>
                                                            <div className='c624d7469d f034cf5568-nowrap a937b09340 a3214e5942 f02fdbd759'>
                                                                <div className='dc5041d860 c72df67c95'>
                                                                    <div className='c624d7469d a0e60936ad a3214e5942'>
                                                                        <div>
                                                                            <div className='d6767e681c'>
                                                                                <h3 className='aab71f8e4e'>
                                                                                    <a key={product.productID} href='#' className='a78ca197d0'>
                                                                                        <div className="f6431b446c a15b38c233">{product.productName}</div>
                                                                                    </a>
                                                                                </h3>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <div className='abf093bdfe ecc6a9ed89'>
                                                                                <span class="aee5343fdb">
                                                                                    <span class="f419a93f12">
                                                                                        <span aria-expanded="false">{product.productAddress}</span>
                                                                                    </span>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <div className='abf093bdfe ecc6a9ed89'>
                                                                                <span class="aee5343fdb">
                                                                                    <span class="f419a93f12">
                                                                                        <span aria-expanded="false">{product.productDescription}</span>
                                                                                    </span>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <span className="f419a93f12">
                                                                                <span aria-expanded="false">
                                                                                    <span className="fcd9eec8fb f798be919c bf9a32efa5" aria-hidden="true">

                                                                                    </span>
                                                                                    <span className="abf093bdfe b058f54b9a">{product.productArea}m²</span>
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className='c624d7469d a0e60936ad a3214e5942 a0ff1335a1'>
                                                                        <div className='c624d7469d a0e60936ad a3214e5942'>
                                                                            <a href="" className='a83ed08757 f88a5204c2 c057617e1a b98133fb50'>
                                                                                <h3 className='project-list-feedback'>{product.rating}&nbsp;<FontAwesomeIcon icon={faStar} color='#FFD43B' /></h3>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='b1037148f8'>
                                                                <div className='c19beea015'>
                                                                    <div className='ccdd44706b'>
                                                                        <div className='c59cd18527'>
                                                                            <h4 tabindex="0" class="abf093bdfe e8f7c070a7">{product.productConvenience}</h4>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='a4b53081e1'>
                                                                    <div className='c624d7469d a0e60936ad a3214e5942 fdccaff19b'>
                                                                        <div className='c5ca594cb1 f19ed67e4b'>
                                                                            <div className='abf093bdfe f45d8e4c32'>{product.productPerson} People</div>
                                                                            <div className='project-list-cost'>${product.productPrice}<a>/night</a></div>
                                                                            <div className="abf093bdfe f45d8e4c32">Taxes and fees included</div>
                                                                        </div>
                                                                        <div className="da8b337763">
                                                                            <Link to={`/detail/${product.productID}`} className="a83ed08757 c21c56c305 a4c1805887 d691166b09 ab98298258 deab83296e c082d89982 c082d89982-before ff33faec5f">
                                                                                <span className="e4adce92df-button">See Availability</span>
                                                                                <span className="eedba9e88a d7eef963fa">
                                                                                    <span classNam="fcd9eec8fb bf9a32efa5">
                                                                                        <span className="fcd9eec8fb bf9a32efa5" aria-hidden="true">
                                                                                            <FontAwesomeIcon className='fcd9eec8fb-icon' icon={faAngleRight} />
                                                                                        </span>
                                                                                    </span>
                                                                                </span>
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

