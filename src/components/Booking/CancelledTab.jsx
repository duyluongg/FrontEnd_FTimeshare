import React, { useState } from 'react';
import TabPanel from '@mui/lab/TabPanel';
import { styled } from '@mui/material/styles';

const CancelledTab = ({ bookingInfoCancel, images, formatDate, handleCancelActive }) => {

    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    });

    const [showImage, setShowImage] = useState(false); // Thêm trạng thái cho việc hiển thị ảnh

    const toggleImage = () => {
        setShowImage(!showImage); // Chuyển đổi trạng thái hiển thị ảnh
    };

    return (
        <>
            <TabPanel className="MuiTabPanel-root" value="4">
                {bookingInfoCancel.map((bookingInfo, index) => {
                    console.log(bookingInfo);
                    const projectImage = images.find(image => image.productID === bookingInfo.product.productID);
                    console.log(projectImage);
                    return (
                        <div className="YL_VlX" key={index}>
                            <div>
                                <div className='J632se'>
                                    <section>
                                        <h3 className="a11y-hidden"></h3>
                                        <div className='P2JMvg'>
                                            <div classNae="RBPP9y">
                                                <div class="UDaMW3" tabindex="0">Owner Name</div>
                                            </div>
                                            <div className='jgIyoX'>
                                                <div class="bv3eJE" tabindex="0">{bookingInfo.bookingStatus}</div>
                                            </div>
                                        </div>
                                    </section>
                                    <div class="kG_yF0"></div>
                                    <section>
                                        <h3 class="a11y-hidden"></h3>
                                        <a href="">
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
                                        </a>
                                    </section>
                                </div>
                            </div>
                            <div class="kG_yF0"></div>
                            <div className='yyqgYp'>
                                <div class="iwUeSD">
                                    <div>
                                        <span class="CDsaN0" tabindex="0">
                                            <div class="shopee-drawer" id="pc-drawer-id-21" tabindex="0"><u class="GQOPby" aria-describedby="0.5723019374949412"></u></div>
                                        </span>
                                    </div>
                                    <span class="f423Cb"></span>
                                </div>
                                <section className='po9nwN'>
                                    <h3 class="a11y-hidden"></h3>
                                    <div class="aAXjeK">
                                        <div>
                                            <button class="stardust-button stardust-button--secondary QY7kZh" onClick={toggleImage}>View Refund Image</button>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div className='refund-image'>
                                {showImage && <img src={bookingInfo.imgRespondName} alt="Booking Respond" style={{ width: '300px' }} />}
                            </div>
                        </div>
                    )
                })}
            </TabPanel>
        </>
    );
};

export default CancelledTab;