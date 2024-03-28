import React, { useEffect } from 'react';
import TabPanel from '@mui/lab/TabPanel';
import { styled } from '@mui/material/styles';

const AcceptedTab = ({ bookingInfoAccepted, images, formatDate, handleCancelActive, loading }) => {

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
            <TabPanel className="MuiTabPanel-root" value="2">
                {bookingInfoAccepted.map((bookingInfo, index) => {
                    console.log(bookingInfo);
                    const projectImage = images.find(image => image.productID === bookingInfo.product.productID);
                    console.log(projectImage);
                    if (bookingInfo.bookingStatus === 'Done') {
                        // Bỏ qua việc render nếu bookingStatus là "Done"
                        return null;
                    }
                    return (
                        <div className="YL_VlX" key={index}>
                            <div>
                                <div className='J632se'>
                                    <section>
                                        <h3 className="a11y-hidden"></h3>
                                        <div className='P2JMvg'>
                                            <div classNae="RBPP9y">
                                                {/* <div class="UDaMW3" tabindex="0">Owner Name</div> */}
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
                                                onClick={() => handleCancelActive(bookingInfo.bookingID)}
                                                // className={`stardust-button stardust-button--primary QY7kZh ${bookingInfo.bookingStatus.includes('Wait to respond') || bookingInfo.bookingStatus === 'In progress' || bookingInfo.bookingStatus === 'Done' ? 'disabled' : ''}`}
                                                // disabled={bookingInfo.bookingStatus.includes('Wait to respond') || bookingInfo.bookingStatus === 'In progress' || bookingInfo.bookingStatus === 'Done'}
                                                className={`stardust-button stardust-button--primary QY7kZh ${bookingInfo.bookingStatus.includes('Wait to respond') || bookingInfo.bookingStatus === 'In progress' ? 'disabled' : ''}`}
                                                disabled={bookingInfo.bookingStatus.includes('Wait to respond') || bookingInfo.bookingStatus === 'In progress'}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    )
                })}
            </TabPanel>
        </>

    );

};

export default AcceptedTab;