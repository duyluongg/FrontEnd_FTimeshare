import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ children }) => {
    const menuItem = [
        {
            path: "/profile",
            name: "Account",
            icon: ""
        },
        {
            path: "/view-booking-history",
            name: "Booking",
            icon: ""
        }
    ]

    return (
        <>
            <div className="sidebar-container">
                <div className="sidebar">
                    <div className="AmWkJQ">
                        <a className="_1O4r+C" href="#" previewlistener="true">
                            <div className="sidebar-avatar">
                                <div className="sidebar-avatar__placeholder">
                                    <svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" class="sidebar-svg-icon icon-headshot"><g><circle cx="7.5" cy="4.5" fill="none" r="3.8" stroke-miterlimit="10"></circle><path d="m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6" fill="none" stroke-linecap="round" stroke-miterlimit="10"></path></g></svg>
                                </div>
                            </div>
                        </a>
                        <div className="miwGmI">
                            <div className="mC1Llc">hanntn2607</div>
                            <div>
                                <a className="_78QHr1" href="#" previewlistener="true">Edit Account</a> //chèn icon giữa a
                            </div>
                        </div>
                    </div>
                    <div className="rhmIbk">
                        <div className="stardust-dropdown">
                            <div className="stardust-dropdown__item-header">
                                {
                                    menuItem.map((item, index) => (
                                        <NavLink to={item.path} key={index} className="+1U02e" activeClassName="active">
                                            {/* <a className="+1U02e" href="#" previewlistener="true"> */}
                                                <div className="bfikuD">
                                                    {item.icon}
                                                </div>
                                                <div className="DlL0zX">
                                                    <span className="adF7Xs">{item.name}</span>
                                                </div>
                                            {/* </a> */}
                                        </NavLink>
                                    ))
                                }
                            </div>
                            {/* <div className="stardust-dropdown__item-body">
                                <div className="Yu7gVR">
                                    <a className="FEE-3D" href="#" previewlistener="true"><span class="qyt-aY">Hồ sơ</span></a>
                                    <a className="FEE-3D" href="#" previewlistener="true"><span class="qyt-aY">Ngân hàng</span></a>
                                    <a className="FEE-3D" href="#" previewlistener="true"><span class="qyt-aY">Địa chỉ</span></a>
                                    <a className="FEE-3D" href="#" previewlistener="true"><span class="qyt-aY">Đổi mật khẩu</span></a>
                                    <a className="FEE-3D" href="#" previewlistener="true"><span class="qyt-aY">Cài đặt thông báo</span></a>
                                </div>
                            </div> */}
                        </div>
                        
                    </div>

                    {/* <div className="top_section">
                        <h1 className="logo">Logo</h1> //Tên + avatar
                        <div className="bars">
                            //icon
                        </div>
                    </div>

                    {
                        menuItem.map((item, index) => (
                            <NavLink to={item.path} key={index} className="link" activeClassName="active">
                                <div className="sidebar-item-icon">{item.icon}</div> //để icon
                                <div className="link_text">{item.name}</div>
                            </NavLink>
                        ))
                    } */}
                </div>
                <main>{children}</main>
            </div>
        </>
    );
}

export default Sidebar;