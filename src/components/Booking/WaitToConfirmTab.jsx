import React from 'react';
import TabPanel from '@mui/lab/TabPanel';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';


const WaitToConfirmTab = ({ bookingInfoConfirm, images, formatDate, handleCancelActive, handlePayment, isCancelled }) => {

    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    });

    return (
        <>
            <TabPanel className="MuiTabPanel-root" value="1">
                {bookingInfoConfirm.map((bookingInfo, index) => {
                    const projectImage = images.find(image => image.productID === bookingInfo.product.productID);
                    return (
                        <div className="YL_VlX" key={index}>
                            <div>
                                <div className='J632se'>
                                    <section>
                                        <h3 className="a11y-hidden"></h3>
                                        <div className='P2JMvg'>
                                            <div classNae="RBPP9y">
                                            </div>
                                            <div className='jgIyoX'>
                                                <div class="bv3eJE" tabindex="0">{bookingInfo.bookingStatus}</div>
                                            </div>
                                        </div>
                                    </section>
                                    <div class="kG_yF0"></div>
                                    <section>
                                        <h3 class="a11y-hidden"></h3>
                                        <Link to="">
                                            <div>
                                                <div className='bdAfgU'>
                                                    <section>
                                                        <div className='mZ1OWk'>
                                                            <div className='dJaa92'>
                                                                <img src={projectImage ? projectImage.imgName : ""} className='gQuHsZ'></img>
                                                                <div className='nmdHRf'>
                                                                    <div>
                                                                        <div className='zWrp4w'>
                                                                            <span class="DWVWOJ" tabindex="0">{bookingInfo.product.productName}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <div className='zWrp4w'>
                                                                            <span class="DWVWOJ" tabindex="0">{formatDate(bookingInfo.startDate)} - {formatDate(bookingInfo.endDate)}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <div class="j3I_Nh" tabindex="0">Number of people: {bookingInfo.bookingPerson}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="ylYzwa" tabindex="0">
                                                                <div class="YRp1mm">
                                                                    <span class="nW_6Oi PNlXhK">${bookingInfo.bookingPrice}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </section>
                                                </div>
                                            </div>
                                        </Link>
                                    </section>
                                </div>
                            </div>
                            <div class="kG_yF0"></div>
                            <div className='yyqgYp'>
                                <div class="iwUeSD">
                                    <div>
                                        <span class="CDsaN0" aria-label="Đánh giá sản phẩm trước 21-03-2024" tabindex="0">
                                            <div class="shopee-drawer" id="pc-drawer-id-21" tabindex="0"><u class="GQOPby" aria-describedby="0.5723019374949412"></u></div>
                                        </span>
                                    </div>
                                    <span class="f423Cb"></span>
                                </div>
                                <section className='po9nwN'>
                                    <h3 class="a11y-hidden"></h3>
                                    {/* <div class="aAXjeK">
                                        <div>
                                            <button onClick={() => handleCancelActive(bookingInfo.bookingID)} class="stardust-button stardust-button--primary QY7kZh">Feedback</button>
                                        </div>
                                    </div>
                                    <div class="hbQXWm">
                                        <div>
                                            <button onClick={() => handleCancelActive(bookingInfo.bookingID)} class="stardust-button stardust-button--secondary QY7kZh">Book Again</button>
                                        </div>
                                    </div> */}
                                    <div class="aAXjeK">
                                        <div>
                                            <button
                                                onClick={() => handlePayment(bookingInfo.bookingID, bookingInfo.bookingPrice)}
                                                className={`stardust-button stardust-button--primary QY7kZh ${isCancelled ? 'hidden' : ''}`}
                                            >
                                                Pay
                                            </button>
                                        </div>
                                    </div>
                                    <div class="aAXjeK">
                                        <div>
                                            <button
                                                onClick={() => handleCancelActive(bookingInfo.bookingID)}
                                                className={`stardust-button stardust-button--primary QY7kZh ${bookingInfo.bookingStatus === 'Wait to confirm (request cancel)' || bookingInfo.bookingStatus === 'Rejected' ? 'disabled' : ''}`}
                                                disabled={bookingInfo.bookingStatus === 'Wait to confirm (request cancel)' || bookingInfo.bookingStatus === 'Rejected'}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>

                                </section>
                            </div>
                        </div>


                        // <div className='f660aace8b aeeb8a0418 ef70cf669a'>
                        //     <a href='#' className='e8eebe7e52'>
                        //         <div className='a53cbfa6de f660aace8b ec64794359 d4dd38cb75 b5d84789f7 ccb444aed8'>
                        //             <div className='f660aace8b b29f11fdcf'>
                        //                 <div className='f660aace8b b5d84789f7'>
                        //                     <div className="f660aace8b ef5b9df724" style="width: 80px;">
                        //                         <picture className="e5a3812a75 f57f9e8eac">
                        //                             <img class="e3fa9175ee ac59045dae" src="https://bstatic.com/xdata/images/hotel/300x300/472366570.jpg?k=fe046c1406098f1aa95fa21dbb19dd872b7916a98dc04840d8cbf8b7b83a9688&amp;o=" alt="AuLe Dorm Room" loading="lazy" />
                        //                         </picture>
                        //                     </div>
                        //                 </div>
                        //             </div>
                        //         </div>
                        //     </a>
                        // </div>
                    )
                })}
            </TabPanel>
        </>
    );
};

export default WaitToConfirmTab;