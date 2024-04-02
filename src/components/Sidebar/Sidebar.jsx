import React, { useContext, useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from '../UserContext.jsx';
import axios from "axios";
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { colors } from "@mui/material";

const Sidebar = ({ children }) => {
    const menuItem = [
        {
            path: "/profile",
            name: "Account",
            icon: <FontAwesomeIcon icon={faUser} />
        },
        {
            path: "/view-booking-history",
            name: "My Booking",
            icon: <FontAwesomeIcon icon={faClipboardList} />
        },
        {
            path: "/wallet-and-reward",
            name: "Rewards and Wallet",
            icon: <FontAwesomeIcon icon={faWallet} />
        }
    ];

    const { user } = useContext(UserContext);
    console.log(user.id);
    const location = useLocation();

    const [activeMenuItem, setActiveMenuItem] = useState("");

    useEffect(() => {
        setActiveMenuItem(location.pathname);
    }, [location.pathname]);

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`https://bookinghomestayswp.azurewebsites.net/api/users/viewDetail/${user.id}`);
                console.log(response.data);
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData(); // Gọi hàm fetch API khi component được render
    }, [user.id]);

    return (
        <>
            <div className="sidebar-background">
                <div className="sidebar-container">
                    <div className="sidebar">
                        {userData && (
                            <div class="acc-profile-card profile-content-card__content">
                                <div class="acc-profile-card__personal-info">
                                <img class="acc-profile-card__user-photo" width="50" height="50" src={userData.imgName} alt="" />
                                    {/* <img class="acc-profile-card__user-photo" width="50" height="50" src="https://lh3.googleusercontent.com/a/ACg8ocKwx0Ea79MRzWq9psF5SbXKrhONWjrieqlri25PmOjp=s96-c?sz=256" alt="" /> */}
                                    <div class="acc-profile-card__name-and-settings">
                                        <div class="acc-profile-card__user-name">
                                            {userData.accName}
                                        </div>
                                        <NavLink to="/update-profile" className='acc-profile-card__edit-settings-action'>
                                            Edit your profile
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="rhmIbk">
                            <div className="stardust-dropdown">
                                <div className="stardust-dropdown__item-header">
                                    {
                                        menuItem.map((item, index) => (
                                            <NavLink
                                                to={item.path}
                                                key={index}
                                                className="+1U02e"
                                                activeClassName="active" // Thêm lớp 'active' khi mục được chọn
                                                isActive={() => item.path === activeMenuItem} // Kiểm tra xem mục nào đang được chọn
                                            >
                                                <div className="bfikuD">
                                                    {item.icon}
                                                </div>
                                                <div className="DlL0zX">
                                                    <span className="adF7Xs">{item.name}</span>
                                                </div>
                                            </NavLink>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <main>{children}</main>
                </div>
            </div>
        </>
    );
}

export default Sidebar;


