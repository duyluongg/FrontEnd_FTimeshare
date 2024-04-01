import React, { createContext, useState } from "react";

const UserContext = createContext({ id: '', auth: false });

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ id: '', auth: false });

    // const loginContext = (id, role, token) => {
    //     setUser((user) => ({
    //         id: id,
    //         role: role,
    //         auth: true,
    //     }));
    //     localStorage.setItem("token", token);
    //     localStorage.setItem("id", id);
    //     localStorage.setItem("role", role);
    // };

    const loginContext = (id, role, token) => {
        setUser((user) => ({
            id: id,
            role: role,
            auth: true,
        }));
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("id", id);
        sessionStorage.setItem("role", role);
    };

    const logout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("role");
        setUser((user) => ({
            id: '',
            role: '',
            auth: false,
        }));
    };

    // const logout = () => {
    //     localStorage.removeItem("token");
    //     localStorage.removeItem("id");
    //     localStorage.removeItem("role");
    //     setUser((user) => ({
    //         id: '',
    //         role: '',
    //         auth: false,
    //     }));
    // };

    return (
        <UserContext.Provider value={{ user, loginContext, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };