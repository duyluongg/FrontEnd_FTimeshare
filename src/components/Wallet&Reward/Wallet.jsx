import React, { useState, useEffect, useContext } from "react";
import './Wallet.css';
import { UserContext } from '../UserContext';
import axios from "axios";

const Wallet = () => {

    const { user } = useContext(UserContext);
    const [totalBalance, setTotalBalance] = useState('');


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

            <div className='bcbf33c5c3'>
                <div class="efdb2b543b e4b7a69a57">
                    <h1 aria-live="assertive" className="f6431b446c d5f78961c3">17 properties found</h1>
                </div>

                {/* {filterProduct.map((product) => { */}
                {/* const projectImage = images.find(image => image.productID === product.productID);
                                    return ( */}
                <div className='dcf496a7b9 bb2746aad9'>
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
                                        {/* {projectImage && <img src={projectImage.imgName} />} */}
                                        <img src="https://cf.bstatic.com/xdata/images/hotel/square200/239846786.webp?k=c6fd7abbdd9cbef9f2287507867702b74b372ebf0b5c20884315ac34f8c2f696&amp;o=" alt="Seahorse Tropical Da Nang Hotel by Haviland" width="200" height="200" className="f9671d49b1" />
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
                                                            <a href='#' className='a78ca197d0'>
                                                                <div className="f6431b446c a15b38c233">Name</div>
                                                            </a>
                                                        </h3>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className='abf093bdfe ecc6a9ed89'>
                                                        <span class="aee5343fdb">
                                                            <span class="f419a93f12">
                                                                <span aria-expanded="false">address</span>
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className='abf093bdfe ecc6a9ed89'>
                                                        <span class="aee5343fdb">
                                                            <span class="f419a93f12">
                                                                <span aria-expanded="false">description</span>
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <span className="f419a93f12">
                                                        <span aria-expanded="false">
                                                            <span className="fcd9eec8fb f798be919c bf9a32efa5" aria-hidden="true">

                                                            </span>
                                                            <span className="abf093bdfe b058f54b9a">area m²</span>
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className='c624d7469d a0e60936ad a3214e5942 a0ff1335a1'>
                                                <div className='c624d7469d a0e60936ad a3214e5942'>
                                                    <a href="" className='a83ed08757 f88a5204c2 c057617e1a b98133fb50'>
                                                        {/* <h3 className='project-list-feedback'>rating&nbsp;<FontAwesomeIcon icon={faStar} color='#FFD43B' /></h3> */}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='b1037148f8'>
                                        <div className='c19beea015'>
                                            <div className='ccdd44706b'>
                                                <div className='c59cd18527'>
                                                    <h4 tabindex="0" class="abf093bdfe e8f7c070a7">productConvenience</h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='a4b53081e1'>
                                            <div className='c624d7469d a0e60936ad a3214e5942 fdccaff19b'>
                                                <div className='c5ca594cb1 f19ed67e4b'>
                                                    <div className='abf093bdfe f45d8e4c32'>productPerson People</div>
                                                    <div className='project-list-cost'>$productPrice<a>/night</a></div>
                                                    <div className="abf093bdfe f45d8e4c32">Taxes and fees included</div>
                                                </div>
                                                <div className="da8b337763">
                                                    {/* <Link to={`/detail/${product.productID}`} className="a83ed08757 c21c56c305 a4c1805887 d691166b09 ab98298258 deab83296e c082d89982 c082d89982-before ff33faec5f">
                                                                                <span className="e4adce92df-button">See Availability</span>
                                                                                <span className="eedba9e88a d7eef963fa">
                                                                                    <span classNam="fcd9eec8fb bf9a32efa5">
                                                                                        <span className="fcd9eec8fb bf9a32efa5" aria-hidden="true">
                                                                                            <FontAwesomeIcon className='fcd9eec8fb-icon' icon={faAngleRight} />
                                                                                        </span>
                                                                                    </span>
                                                                                </span>
                                                                            </Link> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* );
                                })} */}

            </div>
        </>
    );
}

export default Wallet;
