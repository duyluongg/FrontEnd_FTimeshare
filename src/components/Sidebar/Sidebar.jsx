import React, { useContext, useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from '../UserContext.jsx';
import axios from "axios";
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { colors } from "@mui/material";

const Sidebar = ({ children, accountUser }) => {
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
    ];

    const { user } = useContext(UserContext);
    const location = useLocation();

    const [activeMenuItem, setActiveMenuItem] = useState("");

    useEffect(() => {
        // Cập nhật mục được chọn khi đường dẫn thay đổi
        setActiveMenuItem(location.pathname);
    }, [location.pathname]);

    return (
        <>
            <div className="sidebar-background">
                <div className="sidebar-container">
                    <div className="sidebar">
                        <div className="AmWkJQ">
                            <Link to="/profile" className="_1O4r+C" previewlistener="true">
                                <div className="sidebar-avatar">
                                    <div className="sidebar-avatar__placeholder">
                                        <svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" class="sidebar-svg-icon icon-headshot"><g><circle cx="7.5" cy="4.5" fill="none" r="3.8" stroke-miterlimit="10"></circle><path d="m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6" fill="none" stroke-linecap="round" stroke-miterlimit="10"></path></g></svg>
                                    </div>
                                </div>
                            </Link>
                            <div className="miwGmI">
                                <div className="mC1Llc">accName</div>
                                <div>
                                    <NavLink to="/update-profile" className="_78QHr1" activeClassName="active" previewlistener="true">
                                        <FontAwesomeIcon icon={faGear} style={{ color: "#888888" }}/>
                                        &nbsp;Edit Account
                                    </NavLink>
                                </div>
                            </div>
                        </div>
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