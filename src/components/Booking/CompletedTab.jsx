import React from 'react';
import TabPanel from '@mui/lab/TabPanel';
import { styled } from '@mui/material/styles';
import FormFeedback from '../FormFeedback/FormFeedback.jsx';
import FormReport from '../FormReport/FormReport.jsx';

const CompletedTab = ({ bookingInfoComplete, images, formatDate, getData, loading }) => {

    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <TabPanel className="MuiTabPanel-root" value="3">
                {bookingInfoComplete.map((bookingInfo, index) => {
                    const projectImage = images.find(image => image.productID === bookingInfo.product.productID);
                    return (
                        // <div className="YL_VlX" key={index}>
                        //     <div>
                        //         <div className='J632se'>
                        //             <section>
                        //                 <h3 className="a11y-hidden"></h3>
                        //                 <div className='P2JMvg'>
                        //                     <div classNae="RBPP9y">
                        //                         {/* <div class="UDaMW3" tabindex="0">Owner Name</div> */}
                        //                     </div>
                        //                     <div className='jgIyoX'>
                        //                         <div class="bv3eJE" tabindex="0">{bookingInfo.bookingStatus}</div>
                        //                     </div>
                        //                 </div>
                        //             </section>
                        //             <div class="kG_yF0"></div>
                        //             <section>
                        //                 <h3 class="a11y-hidden"></h3>
                        //                 <a href="">
                        //                     <div>
                        //                         <div className='bdAfgU'>
                        //                             <section>
                        //                                 <div className='mZ1OWk'>
                        //                                     <div className='dJaa92'>
                        //                                         <img src={projectImage ? projectImage.imgName : ""} className='gQuHsZ'></img>
                        //                                         <div className='nmdHRf'>
                        //                                             <div>
                        //                                                 <div className='zWrp4w'>
                        //                                                     <span class="DWVWOJ" tabindex="0">{bookingInfo.product.productName}</span>
                        //                                                 </div>
                        //                                             </div>
                        //                                             <div>
                        //                                                 <div className='zWrp4w'>
                        //                                                     <span class="DWVWOJ" tabindex="0">{formatDate(bookingInfo.startDate)} - {formatDate(bookingInfo.endDate)}</span>
                        //                                                 </div>
                        //                                             </div>
                        //                                             <div>
                        //                                                 <div class="j3I_Nh" tabindex="0">Number of people: {bookingInfo.bookingPerson}</div>
                        //                                             </div>
                        //                                         </div>
                        //                                     </div>
                        //                                     <div class="ylYzwa" tabindex="0">
                        //                                         <div class="YRp1mm">
                        //                                             <span class="nW_6Oi PNlXhK">${bookingInfo.bookingPrice}</span>
                        //                                         </div>
                        //                                     </div>
                        //                                 </div>
                        //                             </section>
                        //                         </div>
                        //                     </div>
                        //                 </a>
                        //             </section>
                        //         </div>
                        //     </div>
                        //     <div class="kG_yF0"></div>
                        //     <div className='yyqgYp'>
                        //         <div class="iwUeSD">
                        //             <div>
                        //                 <span class="CDsaN0" aria-label="Đánh giá sản phẩm trước 21-03-2024" tabindex="0">
                        //                     <div class="shopee-drawer" id="pc-drawer-id-21" tabindex="0"><u class="GQOPby" aria-describedby="0.5723019374949412"></u></div>
                        //                 </span>
                        //             </div>
                        //             <span class="f423Cb"></span>
                        //         </div>
                        //         <section className='po9nwN'>
                        //             <h3 class="a11y-hidden"></h3>


                        //             <div class="aAXjeK">
                        //                 <div>
                        //                     {/* <button onClick={() => handleCancelActive(bookingInfo.bookingID)} class="stardust-button stardust-button--primary QY7kZh">Feedback</button> */}
                        //                     <FormFeedback getData={getData} getID={bookingInfo.productID} getBookID={bookingInfo.bookingID} />
                        //                 </div>
                        //             </div>
                        //             <div class="hbQXWm">
                        //                 <div>
                        //                     {/* <button onClick={() => handleCancelActive(bookingInfo.bookingID)} class="stardust-button stardust-button--secondary QY7kZh">Book Again</button> */}
                        //                     <FormReport getData={getData} getID={bookingInfo.productID} getBookID={bookingInfo.bookingID} class="stardust-button stardust-button--primary QY7kZh" />
                        //                 </div>
                        //             </div>
                        //         </section>
                        //     </div>
                        // </div>

                        <div className='bcbf33c5c3' key={index}>
                            <div className='dcf496a7b9 bb2746aad9'>
                                <div className="c733693b78"></div>
                                <div className='d4924c9e74'>
                                    <div className='df91032a39'></div>
                                </div>
                                <div class="bea018f16c">
                                    <div></div>
                                </div>
                                <div className='c82435a4b8 a178069f51 a6ae3c2b40 a18aeea94d d794b7a0f7 f53e278e95 c6710787a4 bbefc5a07c'>
                                    <div className='c066246e13'>
                                        <div className='a5922b8ca1'>
                                            <div className='e952b01718'>
                                                <a href="#" tabindex="-1" aria-hidden="true">
                                                    {/* {projectImage && <img src={projectImage.imgName} />} */}
                                                    {/* <img src="https://cf.bstatic.com/xdata/images/hotel/square200/239846786.webp?k=c6fd7abbdd9cbef9f2287507867702b74b372ebf0b5c20884315ac34f8c2f696&amp;o=" alt="Seahorse Tropical Da Nang Hotel by Haviland" width="200" height="200" className="f9671d49b1" /> */}
                                                    <img src={projectImage ? projectImage.imgName : ""} width="200" height="200" className='f9671d49b1'></img>
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
                                                                            <div className="f6431b446c a15b38c233">{bookingInfo.product.productName}</div>
                                                                        </a>
                                                                    </h3>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className='abf093bdfe ecc6a9ed89'>
                                                                    <span class="aee5343fdb">
                                                                        <span class="f419a93f12">
                                                                            <span aria-expanded="false">{bookingInfo.product.productAddress}</span>
                                                                        </span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <span className="f419a93f12">
                                                                    <span aria-expanded="false">
                                                                        <span className="fcd9eec8fb f798be919c bf9a32efa5" aria-hidden="true">

                                                                        </span>
                                                                        <span className="abf093bdfe b058f54b9a">{bookingInfo.product.productArea} m²</span>
                                                                    </span>
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <div className='abf093bdfe ecc6a9ed89'>
                                                                    <span class="aee5343fdb">
                                                                        <span class="booking-status">
                                                                            <span aria-expanded="false">{bookingInfo.bookingStatus}</span>
                                                                        </span>
                                                                    </span>
                                                                </div>
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
                                                                <h4 tabindex="0" class="abf093bdfe e8f7c070a7">Check-in / Check-out:</h4>
                                                                <h4 tabindex="0" class="abf093bdfe e8f7c070a7">{formatDate(bookingInfo.startDate)} - {formatDate(bookingInfo.endDate)}</h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='a4b53081e1'>
                                                        <div className='c624d7469d a0e60936ad a3214e5942 fdccaff19b'>
                                                            <div className='c5ca594cb1 f19ed67e4b'>
                                                                <div className='abf093bdfe f45d8e4c32'>{bookingInfo.bookingPerson} People</div>
                                                                <div className='project-list-cost'>{bookingInfo.bookingPrice}VND</div>
                                                                <div className="abf093bdfe f45d8e4c32">Taxes and fees included</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='yyqgYp'>
                                        <section className='po9nwN'>
                                            <div class="aAXjeK">
                                                <div>
                                                    {/* <button onClick={() => handleCancelActive(bookingInfo.bookingID)} class="stardust-button stardust-button--primary QY7kZh">Feedback</button> */}
                                                    <FormFeedback getData={getData} getID={bookingInfo.productID} getBookID={bookingInfo.bookingID} />
                                                </div>
                                            </div>
                                            <div class="hbQXWm">
                                                <div>
                                                    {/* <button onClick={() => handleCancelActive(bookingInfo.bookingID)} class="stardust-button stardust-button--secondary QY7kZh">Book Again</button> */}
                                                    <FormReport getData={getData} getID={bookingInfo.productID} getBookID={bookingInfo.bookingID} class="stardust-button stardust-button--primary QY7kZh" />
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </TabPanel>
        </>
    );
};

export default CompletedTab;