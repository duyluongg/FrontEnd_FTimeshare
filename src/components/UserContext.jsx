import React, { createContext, useState } from "react";

const UserContext = createContext({ id: '', auth: false });

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ id: '', auth: false });
    // Login updates the user data with a name parameter
    const loginContext = (id, role, token) => {
        setUser((user) => ({
            id: id,
            role: role,
            auth: true,
        }));
        localStorage.setItem("token", token);
        localStorage.setItem("id", id);
        localStorage.setItem("role", role);
    };

    // Logout updates the user data to default
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("role");
        setUser((user) => ({
            id: '',
            role: '',
            auth: false,
        }));
    };

    return (
        <UserContext.Provider value={{ user, loginContext, logout }}>
            {children}
        </UserContext.Provider>
    );
    // return (
    //     <>
    //     </>
    // )
};

export { UserContext, UserProvider };