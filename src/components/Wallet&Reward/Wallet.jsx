import React, { useState, useEffect, useContext } from "react";
import './Wallet.css';
import { UserContext } from '../UserContext';

const Wallet = () => {

    const { user } = useContext(UserContext);
    console.log(user.id)
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        viewBalance();
    }, []);

    const viewBalance = async () => {
        try {
            const response = await axios.get(`https://bookinghomestayswp.azurewebsites.net/api/bookings/staff/TotalOwnerDoneCancelled/${user.id}`);
            // const response = await axios.get(`https://localhost:8080/api/bookings/staff/TotalOwnerDoneCancelled/${user.id}`);
            console.log(response.data);
            

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
                                            <div class="af8fbdf136">$&nbsp;0</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Wallet;
